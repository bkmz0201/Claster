import { WorkbenchService } from '@affine/core/modules/workbench';
import { getSelectedBlocksCommand } from '@blocksuite/affine/shared/commands';
import { CommentProviderIdentifier } from '@blocksuite/affine/shared/services';
import { StdIdentifier } from '@blocksuite/affine/std';
import { ImageSelection } from '@blocksuite/affine-shared/selection';
import {} from '@blocksuite/global/di';
import { BlockSelection, SurfaceSelection, TextSelection, } from '@blocksuite/std';
import { GfxBlockElementModel, GfxControllerIdentifier, GfxPrimitiveElementModel, } from '@blocksuite/std/gfx';
import { DocCommentManagerService } from '../../../modules/comment/services/doc-comment-manager';
function getPreviewFromSelections(std, selections) {
    if (!selections || selections.length === 0) {
        return '';
    }
    const previews = [];
    const gfx = std.get(GfxControllerIdentifier);
    for (const selection of selections) {
        if (selection instanceof TextSelection) {
            // Extract text from TextSelection
            const textPreview = extractTextFromSelection(std, selection);
            if (textPreview) {
                previews.push(textPreview);
            }
        }
        else if (selection instanceof BlockSelection) {
            // Get block flavour for BlockSelection
            const block = std.store.getBlock(selection.blockId);
            if (block?.model) {
                const flavour = block.model.flavour.replace('affine:', '');
                previews.push(`<${flavour}>`);
            }
        }
        else if (selection instanceof ImageSelection) {
            // Return <"Image"> for ImageSelection
            previews.push('<Image>');
        }
        else if (selection instanceof SurfaceSelection) {
            selection.elements.forEach(elementId => {
                const model = gfx.getElementById(elementId);
                if (model instanceof GfxPrimitiveElementModel) {
                    const flavour = model.type.replace('affine:', '');
                    previews.push(`<${flavour}>`);
                }
                else if (model instanceof GfxBlockElementModel) {
                    const flavour = model.flavour.replace('affine:', '');
                    previews.push(`<${flavour}>`);
                }
            });
        }
        // Skip other types
    }
    return previews.length > 0 ? previews.join(' ') : 'New comment';
}
function extractTextFromSelection(std, selection) {
    try {
        const [_, ctx] = std.command
            .chain()
            .pipe(getSelectedBlocksCommand, {
            currentTextSelection: selection,
            types: ['text'],
        })
            .run();
        const blocks = ctx.selectedBlocks;
        if (!blocks || blocks.length === 0)
            return null;
        const { from, to } = selection;
        const quote = blocks.reduce((acc, block, index) => {
            const text = block.model.text;
            if (!text)
                return acc;
            if (index === 0) {
                // First block: extract from 'from.index' for 'from.length' characters
                const startText = text.yText
                    .toString()
                    .slice(from.index, from.index + from.length);
                return acc + startText;
            }
            if (index === blocks.length - 1 && to) {
                // Last block: extract from start to 'to.index + to.length'
                const endText = text.yText.toString().slice(0, to.index + to.length);
                return acc + (acc ? ' ' : '') + endText;
            }
            // Middle blocks: get all text
            const blockText = text.yText.toString();
            return acc + (acc ? ' ' : '') + blockText;
        }, '');
        // Trim and limit length for preview
        const trimmed = quote.trim();
        return trimmed.length > 200 ? trimmed.substring(0, 200) + '...' : trimmed;
    }
    catch (error) {
        console.warn('Failed to extract text from selection:', error);
        return null;
    }
}
class AffineCommentService {
    constructor(std, framework) {
        this.std = std;
        this.framework = framework;
        this.docCommentManager = framework.get(DocCommentManagerService);
        this.docCommentManager.std = std;
    }
    get currentDocId() {
        return this.std.store.id;
    }
    // todo: need to handle resource leak
    get commentEntityRef() {
        return this.docCommentManager.get(this.currentDocId);
    }
    get commentEntity() {
        return this.commentEntityRef.obj;
    }
    addComment(selections) {
        const workbench = this.framework.get(WorkbenchService).workbench;
        workbench.setSidebarOpen(true);
        workbench.activeView$.value.activeSidebarTab('comment');
        const preview = getPreviewFromSelections(this.std, selections);
        this.commentEntity.addComment(selections, preview).catch(console.error);
    }
    resolveComment(id) {
        this.commentEntity.resolveComment(id, true).catch(console.error);
    }
    highlightComment(id) {
        if (id !== null) {
            const workbench = this.framework.get(WorkbenchService).workbench;
            workbench.setSidebarOpen(true);
            workbench.activeView$.value.activeSidebarTab('comment');
        }
        this.commentEntity.highlightComment(id);
    }
    async getComments(type = 'all') {
        return this.commentEntity.getComments(type);
    }
    onCommentAdded(callback) {
        return this.commentEntity.onCommentAdded((id, selections) => {
            callback(id, selections);
        });
    }
    onCommentResolved(callback) {
        return this.commentEntity.onCommentResolved(callback);
    }
    onCommentDeleted(callback) {
        return this.commentEntity.onCommentDeleted(callback);
    }
    onCommentHighlighted(callback) {
        return this.commentEntity.onCommentHighlighted(callback);
    }
}
export function AffineCommentProvider(framework) {
    return {
        setup: (di) => {
            di.addImpl(CommentProviderIdentifier, provider => new AffineCommentService(provider.get(StdIdentifier), framework));
        },
    };
}
//# sourceMappingURL=comment-provider.js.map