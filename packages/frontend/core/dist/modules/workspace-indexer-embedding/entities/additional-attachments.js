import { catchErrorInto, effect, Entity, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { EMPTY } from 'rxjs';
import { exhaustMap, mergeMap } from 'rxjs/operators';
import { COUNT_PER_PAGE } from '../constants';
import { logger } from '../utils';
export class AdditionalAttachments extends Entity {
    constructor(workspaceService, store) {
        super();
        this.workspaceService = workspaceService;
        this.store = store;
        this.error$ = new LiveData(null);
        this.attachments$ = new LiveData({
            edges: [],
            pageInfo: {
                endCursor: null,
                hasNextPage: false,
            },
            totalCount: 0,
        });
        this.loading$ = new LiveData(true);
        this.uploadingAttachments$ = new LiveData([]);
        this.mergedAttachments$ = LiveData.computed(get => {
            const uploading = get(this.uploadingAttachments$);
            const uploaded = get(this.attachments$).edges.map(edge => edge.node);
            return [...uploading, ...uploaded].slice(0, 10);
        });
        this.getAttachments = effect(exhaustMap((pagination) => {
            return fromPromise(signal => this.store.getEmbeddingFiles(this.workspaceService.workspace.id, pagination, signal)).pipe(smartRetry(), mergeMap(value => {
                const patched = {
                    ...value,
                    edges: value.edges.map(edge => ({
                        ...edge,
                        node: {
                            ...edge.node,
                            status: 'uploaded',
                        },
                    })),
                };
                this.attachments$.next(patched);
                return EMPTY;
            }), catchErrorInto(this.error$, error => {
                logger.error('Failed to fetch workspace doc embedding attachments', error);
            }), onStart(() => this.loading$.setValue(true)), onComplete(() => this.loading$.setValue(false)));
        }));
        this.addAttachments = (files) => {
            const generateLocalId = () => Math.random().toString(36).slice(2) + Date.now();
            const localAttachments = files.map(file => ({
                localId: generateLocalId(),
                fileName: file.name,
                mimeType: file.type,
                size: file.size,
                createdAt: file.lastModified,
                status: 'uploading',
            }));
            this.uploadingAttachments$.next([
                ...localAttachments,
                ...this.uploadingAttachments$.value,
            ]);
            this.store
                .addEmbeddingFiles(this.workspaceService.workspace.id, files)
                .then(() => {
                this.uploadingAttachments$.next(this.uploadingAttachments$.value.filter(att => !localAttachments.some(l => l.localId === att.localId)));
                this.getAttachments({ first: COUNT_PER_PAGE, after: null });
            })
                .catch(error => {
                this.uploadingAttachments$.next(this.uploadingAttachments$.value.map(att => localAttachments.some(l => l.localId === att.localId)
                    ? { ...att, status: 'error', errorMessage: String(error) }
                    : att));
            });
        };
        this.removeAttachment = (id) => {
            const localIndex = this.uploadingAttachments$.value.findIndex(att => att.localId === id);
            if (localIndex !== -1) {
                this.uploadingAttachments$.next(this.uploadingAttachments$.value.filter(att => att.localId !== id));
                return Promise.resolve();
            }
            return this.store
                .removeEmbeddingFile(this.workspaceService.workspace.id, id)
                .then(() => {
                this.getAttachments({ first: COUNT_PER_PAGE, after: null });
            });
        };
    }
    dispose() {
        this.getAttachments.unsubscribe();
    }
}
//# sourceMappingURL=additional-attachments.js.map