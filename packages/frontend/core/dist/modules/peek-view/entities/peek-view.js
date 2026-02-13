import { AffineReference } from '@blocksuite/affine/inlines/reference';
import { Entity, LiveData } from '@toeverything/infra';
import { firstValueFrom, map, race } from 'rxjs';
import { resolveLinkToDoc } from '../../navigation';
const isEmbedLinkedDocModel = (blockModel) => {
    return blockModel.flavour === 'affine:embed-linked-doc';
};
const isEmbedSyncedDocModel = (blockModel) => {
    return blockModel.flavour === 'affine:embed-synced-doc';
};
const isImageBlockModel = (blockModel) => {
    return blockModel.flavour === 'affine:image';
};
const isAttachmentBlockModel = (blockModel) => {
    return blockModel.flavour === 'affine:attachment';
};
const isSurfaceRefModel = (blockModel) => {
    return blockModel.flavour === 'affine:surface-ref';
};
const isAIChatBlockModel = (blockModel) => {
    return blockModel.flavour === 'affine:embed-ai-chat';
};
function resolvePeekInfoFromPeekTarget(peekTarget, template) {
    if (template) {
        return {
            type: 'template',
            template,
        };
    }
    const element = peekTarget.element;
    if (element) {
        if (element instanceof AffineReference) {
            const referenceInfo = element.referenceInfo;
            if (referenceInfo) {
                const { pageId: docId, params } = referenceInfo;
                const info = {
                    type: 'doc',
                    docRef: { docId, ...params },
                };
                return info;
            }
        }
        else if ('model' in element) {
            const blockModel = element.model;
            if (isEmbedLinkedDocModel(blockModel) ||
                isEmbedSyncedDocModel(blockModel)) {
                const { pageId: docId, params } = blockModel.props;
                const info = {
                    type: 'doc',
                    docRef: { docId, ...params },
                };
                return info;
            }
            else if (isSurfaceRefModel(blockModel)) {
                const refModel = element.referenceModel;
                // refModel can be null if the reference is invalid
                if (refModel) {
                    const docId = 'store' in refModel ? refModel.store.id : refModel.surface.store.id;
                    return {
                        type: 'doc',
                        docRef: {
                            docId,
                            mode: 'edgeless',
                            xywh: refModel.xywh,
                        },
                    };
                }
            }
            else if (isAttachmentBlockModel(blockModel)) {
                return {
                    type: 'attachment',
                    docRef: {
                        docId: blockModel.store.id,
                        blockIds: [blockModel.id],
                        filetype: blockModel.props.type,
                    },
                };
            }
            else if (isImageBlockModel(blockModel)) {
                return {
                    type: 'image',
                    docRef: {
                        docId: blockModel.store.id,
                        blockIds: [blockModel.id],
                    },
                };
            }
            else if (isAIChatBlockModel(blockModel) && 'host' in element) {
                return {
                    type: 'ai-chat-block',
                    docRef: {
                        docId: blockModel.store.id,
                        blockIds: [blockModel.id],
                    },
                    model: blockModel,
                    host: element.host,
                };
            }
        }
        else if (element instanceof HTMLAnchorElement) {
            const maybeDoc = resolveLinkToDoc(element.href);
            if (maybeDoc) {
                const info = {
                    type: 'doc',
                    docRef: maybeDoc,
                };
                return info;
            }
        }
    }
    if ('docRef' in peekTarget && peekTarget.docRef) {
        return {
            type: 'doc',
            docRef: peekTarget.docRef,
        };
    }
    return;
}
export class PeekViewEntity extends Entity {
    constructor(workbenchService) {
        super();
        this.workbenchService = workbenchService;
        this._active$ = new LiveData(null);
        this._show$ = new LiveData({
            animation: true,
            value: false,
        });
        this.active$ = this._active$.distinctUntilChanged();
        this.show$ = this._show$
            .map(show => (this._active$.value !== null ? show : null))
            .distinctUntilChanged();
        // return true if the peek view will be handled
        this.open = async (targetOrInfo, template, abortSignal) => {
            let target;
            let resolvedInfo;
            if ('type' in targetOrInfo) {
                resolvedInfo = targetOrInfo;
                target = {};
            }
            else {
                target = targetOrInfo;
                resolvedInfo = resolvePeekInfoFromPeekTarget(target, template);
            }
            if (!resolvedInfo) {
                return;
            }
            const active = this._active$.value;
            // if there is an active peek view and it is a doc peek view, we will navigate it first
            if (active?.info.type === 'doc' && this.show$.value?.value) {
                // TODO(@pengx17): scroll to the viewing position?
                this.workbenchService.workbench.openDoc(active.info.docRef);
            }
            this._active$.next({ target, info: resolvedInfo });
            this._show$.next({
                value: true,
                animation: true,
            });
            if (abortSignal) {
                const abortListener = () => {
                    if (this.active$.value?.target === target) {
                        this.close();
                    }
                };
                abortSignal.addEventListener('abort', abortListener);
                const showSubscription = this.show$.subscribe(v => {
                    if (!v && !abortSignal.aborted) {
                        abortSignal.removeEventListener('abort', abortListener);
                        showSubscription.unsubscribe();
                    }
                });
            }
            return firstValueFrom(race(this._active$, this.show$).pipe(map(() => { })));
        };
        this.close = (animation = true) => {
            this._show$.next({
                value: false,
                animation,
            });
        };
    }
}
//# sourceMappingURL=peek-view.js.map