import { catchErrorInto, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, smartRetry, } from '@toeverything/infra';
import { tap } from 'rxjs';
export class DocBacklinks extends Entity {
    constructor(docsSearchService, docService, docsService, featureFlagService, workspaceService) {
        super();
        this.docsSearchService = docsSearchService;
        this.docService = docService;
        this.docsService = docsService;
        this.featureFlagService = featureFlagService;
        this.workspaceService = workspaceService;
        this.backlinks$ = new LiveData(undefined);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(undefined);
        this.revalidateFromCloud = effect(exhaustMapWithTrailing(() => fromPromise(async () => {
            const searchFromCloud = this.featureFlagService.flags.enable_battery_save_mode &&
                this.workspaceService.workspace.flavour !== 'local';
            const { buckets } = await this.docsSearchService.indexer.aggregate('block', {
                type: 'boolean',
                occur: 'must',
                queries: [
                    {
                        type: 'match',
                        field: 'refDocId',
                        match: this.docService.doc.id,
                    },
                ],
            }, 'docId', {
                hits: {
                    fields: [
                        'docId',
                        'blockId',
                        'parentBlockId',
                        'parentFlavour',
                        'additional',
                        'markdownPreview',
                    ],
                    pagination: {
                        limit: 5, // the max number of backlinks to show for each doc
                    },
                },
                pagination: {
                    limit: 100,
                },
                prefer: searchFromCloud ? 'remote' : 'local',
            });
            return buckets.flatMap(bucket => {
                const title = this.docsService.list.doc$(bucket.key).value?.title$.value ?? '';
                if (bucket.key === this.docService.doc.id) {
                    // Ignore if it is a link to the current document.
                    return [];
                }
                return bucket.hits.nodes.map(node => {
                    const blockId = node.fields.blockId ?? '';
                    const markdownPreview = node.fields.markdownPreview ?? '';
                    const additional = typeof node.fields.additional === 'string'
                        ? node.fields.additional
                        : node.fields.additional[0];
                    const additionalData = JSON.parse(additional || '{}');
                    const displayMode = additionalData.displayMode ?? '';
                    const noteBlockId = additionalData.noteBlockId ?? '';
                    const parentBlockId = typeof node.fields.parentBlockId === 'string'
                        ? node.fields.parentBlockId
                        : node.fields.parentBlockId[0];
                    const parentFlavour = typeof node.fields.parentFlavour === 'string'
                        ? node.fields.parentFlavour
                        : node.fields.parentFlavour[0];
                    return {
                        docId: bucket.key,
                        blockId: typeof blockId === 'string' ? blockId : blockId[0],
                        title: title,
                        markdownPreview: typeof markdownPreview === 'string'
                            ? markdownPreview
                            : markdownPreview[0],
                        displayMode: typeof displayMode === 'string' ? displayMode : displayMode[0],
                        noteBlockId: typeof noteBlockId === 'string' ? noteBlockId : noteBlockId[0],
                        parentBlockId: typeof parentBlockId === 'string'
                            ? parentBlockId
                            : parentBlockId[0],
                        parentFlavour: typeof parentFlavour === 'string'
                            ? parentFlavour
                            : parentFlavour[0],
                    };
                });
            });
        }).pipe(smartRetry(), tap(backlinks => {
            this.backlinks$.value = backlinks;
        }), catchErrorInto(this.error$), onStart(() => {
            this.isLoading$.value = true;
        }), onComplete(() => {
            this.isLoading$.value = false;
        }))));
    }
}
//# sourceMappingURL=doc-backlinks.js.map