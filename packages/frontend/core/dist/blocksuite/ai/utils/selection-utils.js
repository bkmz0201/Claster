import { EdgelessClipboardController, splitElements, } from '@blocksuite/affine/blocks/root';
import { getSurfaceBlock, } from '@blocksuite/affine/blocks/surface';
import { DatabaseBlockModel, ImageBlockModel } from '@blocksuite/affine/model';
import { getBlockSelectionsCommand, getImageSelectionsCommand, getSelectedBlocksCommand, getSelectedModelsCommand, getTextSelectionCommand, } from '@blocksuite/affine/shared/commands';
import { matchModels } from '@blocksuite/affine/shared/utils';
import { TextSelection } from '@blocksuite/affine/std';
import { GfxControllerIdentifier, } from '@blocksuite/affine/std/gfx';
import { Slice, toDraftModel, } from '@blocksuite/affine/store';
import { getContentFromSlice } from '../../utils';
import { isAttachment } from './attachment';
import { getEdgelessCopilotWidget } from './get-edgeless-copilot-widget';
export async function selectedToCanvas(host) {
    const gfx = host.std.get(GfxControllerIdentifier);
    return elementsToCanvas(host, gfx.selection.selectedElements);
}
export async function allToCanvas(host) {
    const gfx = host.std.get(GfxControllerIdentifier);
    return elementsToCanvas(host, gfx.gfxElements);
}
export async function elementsToCanvas(host, elements) {
    const { notes, frames, shapes, images, edgelessTexts, embedSyncedDocs } = splitElements(elements);
    const blockElements = [
        ...notes,
        ...frames,
        ...images,
        ...edgelessTexts,
        ...embedSyncedDocs,
    ];
    const hasElements = blockElements.length > 0 || shapes.length > 0;
    if (!hasElements) {
        return;
    }
    try {
        const canvas = await host.std
            .get(EdgelessClipboardController)
            .toCanvas(blockElements, shapes);
        if (!canvas) {
            return;
        }
        return canvas;
    }
    catch (e) {
        console.error('elementsToCanvas error', e);
        return;
    }
}
export function getSelectedModels(editorHost) {
    const [_, ctx] = editorHost.std.command.exec(getSelectedModelsCommand, {
        types: ['block', 'text'],
    });
    const { selectedModels } = ctx;
    return selectedModels;
}
export function traverse(model, drafts) {
    const isDatabase = model.flavour === 'affine:database';
    const children = isDatabase
        ? model.children
        : model.children.filter(child => {
            const idx = drafts.findIndex(m => m.id === child.id);
            return idx >= 0;
        });
    children.forEach(child => {
        const idx = drafts.findIndex(m => m.id === child.id);
        if (idx >= 0) {
            drafts.splice(idx, 1);
        }
        traverse(child, drafts);
    });
    model.children = children;
}
export async function getTextContentFromBlockModels(editorHost, models, type = 'markdown') {
    // Currently only filter out images and databases
    const selectedTextModels = models.filter(model => !matchModels(model, [ImageBlockModel, DatabaseBlockModel]));
    const drafts = selectedTextModels.map(toDraftModel);
    drafts.forEach(draft => traverse(draft, drafts));
    const slice = Slice.fromModels(editorHost.std.store, drafts);
    return getContentFromSlice(editorHost, slice, type);
}
export async function getSelectedTextContent(editorHost, type = 'markdown') {
    const selectedModels = getSelectedModels(editorHost);
    if (!selectedModels)
        return '';
    return getTextContentFromBlockModels(editorHost, selectedModels, type);
}
export async function selectAboveBlocks(editorHost, num = 10) {
    let selectedModels = getSelectedModels(editorHost);
    if (!selectedModels)
        return '';
    const lastLeafModel = selectedModels[selectedModels.length - 1];
    let noteModel = lastLeafModel;
    let lastRootModel = null;
    while (noteModel && noteModel.flavour !== 'affine:note') {
        lastRootModel = noteModel;
        noteModel = editorHost.store.getParent(noteModel);
    }
    if (!noteModel || !lastRootModel)
        return '';
    const endIndex = noteModel.children.indexOf(lastRootModel) + 1;
    const startIndex = Math.max(0, endIndex - num);
    const startBlock = noteModel.children[startIndex];
    selectedModels = [];
    let stop = false;
    const traverse = (model) => {
        if (stop)
            return;
        selectedModels.push(model);
        if (model === lastLeafModel) {
            stop = true;
            return;
        }
        model.children.forEach(child => traverse(child));
    };
    noteModel.children.slice(startIndex, endIndex).forEach(traverse);
    const { selection } = editorHost;
    selection.set([
        selection.create(TextSelection, {
            from: {
                blockId: startBlock.id,
                index: 0,
                length: startBlock.text?.length ?? 0,
            },
            to: {
                blockId: lastLeafModel.id,
                index: 0,
                length: selection.find(TextSelection)?.from.index ?? 0,
            },
        }),
    ]);
    return getTextContentFromBlockModels(editorHost, selectedModels);
}
export function getSurfaceElementFromEditor(editor) {
    const { store } = editor;
    const surfaceModel = getSurfaceBlock(store);
    if (!surfaceModel)
        return null;
    const surfaceId = surfaceModel.id;
    const surfaceElement = editor.querySelector(`affine-surface[data-block-id="${surfaceId}"]`);
    if (!surfaceElement)
        return null;
    return surfaceElement;
}
export const getSelections = (host, mode = 'flat') => {
    const [_, data] = host.command
        .chain()
        .tryAll(chain => [
        chain.pipe(getTextSelectionCommand),
        chain.pipe(getBlockSelectionsCommand),
        chain.pipe(getImageSelectionsCommand),
    ])
        .pipe(getSelectedBlocksCommand, { types: ['text', 'block', 'image'], mode })
        .run();
    return data;
};
export const getSelectedImagesAsBlobs = async (host) => {
    const [_, data] = host.command
        .chain()
        .tryAll(chain => [
        chain.pipe(getTextSelectionCommand),
        chain.pipe(getBlockSelectionsCommand),
        chain.pipe(getImageSelectionsCommand),
    ])
        .pipe(getSelectedBlocksCommand, {
        types: ['block', 'image'],
    })
        .run();
    const blobs = await Promise.all(data.selectedBlocks?.map(async (b) => {
        const sourceId = b.model.props.sourceId;
        if (!sourceId)
            return null;
        const blob = await host.store.blobSync.get(sourceId);
        if (!blob)
            return null;
        return new File([blob], sourceId);
    }) ?? []);
    return blobs.filter((blob) => !!blob);
};
export const getSelectedAttachments = async (host) => {
    const [_, data] = host.command.exec(getSelectedBlocksCommand, {
        types: ['block'],
    });
    const blocks = data.selectedBlocks ?? [];
    const attachments = [];
    for (const block of blocks) {
        if (isAttachment(block.model)) {
            const { sourceId, name } = block.model.props;
            if (sourceId && name) {
                attachments.push({ sourceId, name });
            }
        }
    }
    return attachments;
};
export const getSelectedNoteAnchor = (host, id) => {
    return host.querySelector(`affine-edgeless-note[data-block-id="${id}"]`);
};
export function getCopilotSelectedElems(host) {
    const gfx = host.std.get(GfxControllerIdentifier);
    const copilotWidget = getEdgelessCopilotWidget(host);
    if (copilotWidget.visible) {
        const currentTool = gfx.tool.currentTool$.peek();
        return currentTool?.selectedElements ?? [];
    }
    return gfx.selection.selectedElements;
}
export const imageCustomInput = async (host) => {
    const selectedElements = getCopilotSelectedElems(host);
    if (selectedElements.length !== 1)
        return;
    const imageBlock = selectedElements[0];
    if (!(imageBlock instanceof ImageBlockModel))
        return;
    if (!imageBlock.props.sourceId)
        return;
    const blob = await host.store.blobSync.get(imageBlock.props.sourceId);
    if (!blob)
        return;
    return {
        attachments: [blob],
    };
};
//# sourceMappingURL=selection-utils.js.map