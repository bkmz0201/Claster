import { ServerFeature } from '@affine/graphql';
import { SearchIcon } from '@blocksuite/icons/rc';
import { effect, Entity, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { truncate } from 'lodash-es';
import { catchError, EMPTY, map, of, switchMap, tap, throttleTime } from 'rxjs';
export class DocsQuickSearchSession extends Entity {
    constructor(workspaceService, workspaceServerService, docsSearchService, docsService, docDisplayMetaService, featureFlagService) {
        super();
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.docsSearchService = docsSearchService;
        this.docsService = docsService;
        this.docDisplayMetaService = docDisplayMetaService;
        this.featureFlagService = featureFlagService;
        this.isSupportServerIndexer = () => this.workspaceServerService.server?.config$.value.features.includes(ServerFeature.Indexer) ?? false;
        this.isEnableBatterySaveMode = () => this.featureFlagService.flags.enable_battery_save_mode.value;
        this.isIndexerLoading$ = this.docsSearchService.indexerState$.map(({ completed }) => {
            return !completed;
        });
        this.isQueryLoading$ = new LiveData(false);
        this.isCloudWorkspace = this.workspaceService.workspace.flavour !== 'local';
        this.searchLocallyItem = {
            id: 'search-locally',
            source: 'docs',
            label: {
                title: {
                    i18nKey: 'com.affine.quicksearch.search-locally',
                },
            },
            score: 1000,
            icon: SearchIcon,
            payload: {
                docId: '',
            },
            beforeSubmit: () => {
                this.searchLocally = true;
                this.query(this.lastQuery);
                return false;
            },
        };
        this.isLoading$ = LiveData.computed(get => {
            return ((this.isCloudWorkspace ? false : get(this.isIndexerLoading$)) ||
                get(this.isQueryLoading$));
        });
        this.error$ = new LiveData(null);
        this.lastQuery = '';
        this.items$ = new LiveData([]);
        this.searchLocally = !this.isCloudWorkspace;
        this.query = effect(tap(query => {
            this.lastQuery = query;
        }), throttleTime(500, undefined, {
            leading: false,
            trailing: true,
        }), switchMap((query) => {
            let out;
            if (!query) {
                out = of([]);
            }
            else {
                out = this.docsSearchService.search$(query).pipe(map(docs => docs
                    .map(doc => {
                    const docRecord = this.docsService.list.doc$(doc.docId).value;
                    return [doc, docRecord];
                })
                    .filter((props) => !!props[1])
                    .map(([doc, docRecord]) => {
                    const { title, icon, updatedDate } = this.docDisplayMetaService.getDocDisplayMeta(docRecord);
                    return {
                        id: 'doc:' + docRecord.id,
                        source: 'docs',
                        group: {
                            id: 'docs',
                            label: {
                                i18nKey: this.searchLocally
                                    ? 'com.affine.quicksearch.group.searchfor-locally'
                                    : 'com.affine.quicksearch.group.searchfor',
                                options: { query: truncate(query) },
                            },
                            score: 5,
                        },
                        label: {
                            title: title,
                            subTitle: doc.blockContent,
                        },
                        score: doc.score,
                        icon,
                        timestamp: updatedDate,
                        payload: doc,
                    };
                })));
            }
            return out.pipe(tap((items) => {
                this.items$.next(this.isSupportServerIndexer() &&
                    !this.searchLocally &&
                    !this.isEnableBatterySaveMode()
                    ? [...items, this.searchLocallyItem]
                    : items);
                this.isQueryLoading$.next(false);
            }), onStart(() => {
                this.error$.next(null);
                this.items$.next(this.isSupportServerIndexer() &&
                    !this.searchLocally &&
                    !this.isEnableBatterySaveMode()
                    ? [this.searchLocallyItem]
                    : []);
                this.isQueryLoading$.next(true);
            }), catchError(err => {
                this.error$.next(err instanceof Error ? err.message : err);
                this.items$.next(this.isSupportServerIndexer() &&
                    !this.searchLocally &&
                    !this.isEnableBatterySaveMode()
                    ? [this.searchLocallyItem]
                    : []);
                this.isQueryLoading$.next(false);
                return EMPTY;
            }), onComplete(() => { }));
        }));
    }
    // TODO(@EYHN): load more
    dispose() {
        this.query.unsubscribe();
    }
}
//# sourceMappingURL=docs.js.map