import { splitElements } from '@blocksuite/affine/blocks/root';
import { DefaultTool } from '@blocksuite/affine/blocks/surface';
import { CodeBlockModel, EdgelessTextBlockModel, EmbedSyncedDocModel, ImageBlockModel, NoteBlockModel, ShapeElementModel, TextElementModel, } from '@blocksuite/affine/model';
import { matchModels } from '@blocksuite/affine/shared/utils';
import { GfxControllerIdentifier, } from '@blocksuite/affine/std/gfx';
import { Slice } from '@blocksuite/affine/store';
import { getContentFromSlice } from '../../utils';
import { AIChatBlockModel } from '../blocks';
import { AIProvider } from '../provider';
import { reportResponse } from '../utils/action-reporter';
import { getAIPanelWidget } from '../utils/ai-widgets';
import { AIContext } from '../utils/context';
import { getEdgelessCopilotWidget, isMindmapChild, isMindMapRoot, } from '../utils/edgeless';
import { copyTextAnswer } from '../utils/editor-actions';
import { getCopilotSelectedElems, getSelectedNoteAnchor, getSelections, } from '../utils/selection-utils';
import { actionToAnswerRenderer } from './answer-renderer';
import { EXCLUDING_COPY_ACTIONS } from './consts';
import { bindTextStream } from './doc-handler';
import { actionToErrorResponse, actionToGenerating, actionToResponse, getToolbar, } from './edgeless-response';
async function getContentFromEmbedSyncedDocModel(host, models) {
    const slice = Slice.fromModels(host.store, models);
    return (await getContentFromSlice(host, slice)).trim();
}
async function getContentFromHubBlockModel(host, models) {
    return (await Promise.all(models.map(model => {
        const slice = Slice.fromModels(host.store, model.children);
        return getContentFromSlice(host, slice);
    })))
        .map(content => content.trim())
        .filter(content => content.length);
}
export async function getContentFromSelected(host, selected) {
    function isShapeWithText(el) {
        return el.text !== undefined && el.text.length !== 0;
    }
    function isImageWithCaption(el) {
        return el.props.caption !== undefined && el.props.caption.length !== 0;
    }
    const { notes, texts, shapes, images, edgelessTexts, embedSyncedDocs } = selected.reduce((pre, cur) => {
        if (cur instanceof NoteBlockModel) {
            pre.notes.push(cur);
        }
        else if (cur instanceof TextElementModel) {
            pre.texts.push(cur);
        }
        else if (cur instanceof ShapeElementModel && isShapeWithText(cur)) {
            pre.shapes.push(cur);
        }
        else if (cur instanceof ImageBlockModel && isImageWithCaption(cur)) {
            pre.images.push(cur.props);
        }
        else if (cur instanceof EdgelessTextBlockModel) {
            pre.edgelessTexts.push(cur);
        }
        else if (cur instanceof EmbedSyncedDocModel) {
            pre.embedSyncedDocs.push(cur);
        }
        return pre;
    }, {
        notes: [],
        texts: [],
        shapes: [],
        images: [],
        edgelessTexts: [],
        embedSyncedDocs: [],
    });
    const hasPageBlock = notes.find(note => note.isPageBlock());
    const title = hasPageBlock && host.std.store.meta?.title
        ? `# ${host.std.store.meta?.title}\n`
        : '';
    const noteContent = await getContentFromHubBlockModel(host, notes);
    const edgelessTextContent = await getContentFromHubBlockModel(host, edgelessTexts);
    const syncedDocsContent = await getContentFromEmbedSyncedDocModel(host, embedSyncedDocs);
    return `${title}${noteContent.join('\n')}
${edgelessTextContent.join('\n')}
${syncedDocsContent}
${texts.map(text => text.text.toString()).join('\n')}
${shapes.map(shape => shape.text.toString()).join('\n')}
${images.map(image => image.caption.toString()).join('\n')}
`.trim();
}
function getTextFromSelected(host) {
    const selected = getCopilotSelectedElems(host);
    return getContentFromSelected(host, selected);
}
function actionToStream(id, signal, variants, extract, trackerOptions, panelInput, networkConfig) {
    const action = AIProvider.actions[id];
    if (!action || typeof action !== 'function')
        return;
    if (extract && typeof extract === 'function') {
        return (host, ctx) => {
            let stream;
            const control = trackerOptions?.control || 'format-bar';
            const where = trackerOptions?.where || 'ai-panel';
            return {
                async *[Symbol.asyncIterator]() {
                    const models = getCopilotSelectedElems(host);
                    const { visible, enabled } = networkConfig ?? {};
                    const options = {
                        ...variants,
                        signal,
                        input: panelInput ?? '',
                        stream: true,
                        control,
                        where,
                        models,
                        host,
                        docId: host.store.id,
                        workspaceId: host.store.workspace.id,
                        webSearch: visible?.value && enabled?.value,
                    };
                    const content = ctx.get().content;
                    if (typeof content === 'string' && !content.length && panelInput) {
                        ctx.set({
                            content: panelInput,
                        });
                    }
                    const data = await extract(host, ctx);
                    if (data) {
                        Object.assign(options, data);
                    }
                    // @ts-expect-error TODO(@Peng): maybe fix this
                    stream = await action(options);
                    if (!stream)
                        return;
                    yield* stream;
                },
            };
        };
    }
    return (host) => {
        let stream;
        return {
            async *[Symbol.asyncIterator]() {
                const panel = getAIPanelWidget(host);
                const models = getCopilotSelectedElems(host);
                const markdown = await getTextFromSelected(panel.host);
                const options = {
                    ...variants,
                    signal,
                    input: markdown,
                    stream: true,
                    where: 'ai-panel',
                    models,
                    control: 'format-bar',
                    host,
                    docId: host.store.id,
                    workspaceId: host.store.workspace.id,
                };
                // @ts-expect-error TODO(@Peng): maybe fix this
                stream = await action(options);
                if (!stream)
                    return;
                yield* stream;
            },
        };
    };
}
function actionToGeneration(id, variants, extract, trackerOptions, networkConfig) {
    return (host, ctx) => {
        return ({ input, signal, update, finish, }) => {
            if (!extract) {
                const selectedElements = getCopilotSelectedElems(host);
                if (selectedElements.length === 0)
                    return;
            }
            const stream = actionToStream(id, signal, variants, extract, trackerOptions, input, networkConfig)?.(host, ctx);
            if (!stream)
                return;
            bindTextStream(stream, { update, finish, signal });
        };
    };
}
function updateEdgelessAIPanelConfig(aiPanel, edgelessCopilot, id, generatingIcon, ctx, variants, customInput, trackerOptions) {
    const host = aiPanel.host;
    const { config } = aiPanel;
    if (!config)
        return;
    config.answerRenderer = actionToAnswerRenderer(id, host, ctx);
    config.generateAnswer = actionToGeneration(id, variants, customInput, trackerOptions, config.networkSearchConfig)(host, ctx);
    config.finishStateConfig = actionToResponse(id, host, ctx, variants);
    config.generatingStateConfig = actionToGenerating(id, generatingIcon);
    config.errorStateConfig = actionToErrorResponse(aiPanel, id, host, ctx, variants);
    config.copy = {
        allowed: !EXCLUDING_COPY_ACTIONS.includes(id),
        onCopy: () => {
            return copyTextAnswer(aiPanel);
        },
    };
    config.discardCallback = () => {
        reportResponse('result:discard');
    };
    config.hideCallback = () => {
        aiPanel.updateComplete
            .finally(() => {
            edgelessCopilot.gfx.tool.setTool(DefaultTool);
            edgelessCopilot.gfx.selection.set({
                elements: [],
                editing: false,
            });
            host.selection.clear();
            edgelessCopilot.lockToolbar(false);
        })
            .catch(console.error);
    };
}
export function actionToHandler(id, generatingIcon, variants, customInput, trackerOptions) {
    return (host) => {
        const aiPanel = getAIPanelWidget(host);
        const edgelessCopilot = getEdgelessCopilotWidget(host);
        const selectedElements = getCopilotSelectedElems(host);
        const { selectedBlocks } = getSelections(host);
        const ctx = new AIContext({ selectedElements });
        edgelessCopilot.hideCopilotPanel();
        edgelessCopilot.lockToolbar(true);
        updateEdgelessAIPanelConfig(aiPanel, edgelessCopilot, id, generatingIcon, ctx, variants, customInput, trackerOptions);
        const toolbar = getToolbar(host);
        const isEmpty = selectedElements.length === 0;
        const isCreateImageAction = id === 'createImage';
        const isMakeItRealAction = !isCreateImageAction && id === 'makeItReal';
        let referenceElement = null;
        let togglePanel = () => Promise.resolve(isEmpty);
        if (selectedBlocks && selectedBlocks.length !== 0) {
            referenceElement = selectedBlocks.at(-1);
        }
        else if (edgelessCopilot.visible && edgelessCopilot.selectionElem) {
            referenceElement = edgelessCopilot.selectionElem;
        }
        else if (toolbar?.dataset.open) {
            referenceElement = toolbar;
        }
        else if (!isEmpty) {
            const lastSelected = selectedElements.at(-1)?.id;
            if (!lastSelected)
                return;
            const noteAnchor = getSelectedNoteAnchor(host, lastSelected);
            referenceElement = noteAnchor;
        }
        if (!referenceElement) {
            const gfx = host.std.get(GfxControllerIdentifier);
            gfx?.tool.setTool(DefaultTool);
            edgelessCopilot.lockToolbar(false);
            return;
        }
        if (isCreateImageAction || isMakeItRealAction) {
            togglePanel = async () => {
                if (isEmpty)
                    return true;
                const { notes, shapes, images, edgelessTexts, embedSyncedDocs } = splitElements(selectedElements);
                const blocks = [
                    ...notes,
                    ...shapes,
                    ...images,
                    ...edgelessTexts,
                    ...embedSyncedDocs,
                ];
                if (blocks.length === 0)
                    return true;
                const content = await getContentFromSelected(host, blocks);
                ctx.set({
                    content,
                });
                return content.length === 0;
            };
        }
        togglePanel()
            .then(isEmpty => {
            aiPanel.toggle(referenceElement, isEmpty ? 'input' : 'generate');
        })
            .catch(console.error);
    };
}
export function noteBlockOrTextShowWhen(_, __, host) {
    const selected = getCopilotSelectedElems(host);
    return selected.some(el => el instanceof NoteBlockModel ||
        el instanceof TextElementModel ||
        el instanceof EdgelessTextBlockModel);
}
/**
 * Checks if the selected element is a NoteBlockModel with a single child element of code block.
 */
export function noteWithCodeBlockShowWen(_, __, host) {
    const selected = getCopilotSelectedElems(host);
    if (!selected.length)
        return false;
    return (selected[0] instanceof NoteBlockModel &&
        selected[0].children.length === 1 &&
        matchModels(selected[0].children[0], [CodeBlockModel]));
}
export function mindmapChildShowWhen(_, __, host) {
    const selected = getCopilotSelectedElems(host);
    return selected.length === 1 && isMindmapChild(selected[0]);
}
export function imageOnlyShowWhen(_, __, host) {
    const selected = getCopilotSelectedElems(host);
    return selected.length === 1 && selected[0] instanceof ImageBlockModel;
}
export function mindmapRootShowWhen(_, __, host) {
    const selected = getCopilotSelectedElems(host);
    return selected.length === 1 && isMindMapRoot(selected[0]);
}
// TODO(@chen): remove this function after the new AI chat block related function is fully implemented
export function notAllAIChatBlockShowWhen(_, __, host) {
    const selected = getCopilotSelectedElems(host);
    if (selected.length === 0)
        return true;
    const allAIChatBlocks = selected.every(model => model instanceof AIChatBlockModel);
    return !allAIChatBlocks;
}
//# sourceMappingURL=edgeless-handler.js.map