import { createYProxy } from '@blocksuite/affine/store';
import { LiveData, Service } from '@toeverything/infra';
import { defaultsDeep } from 'lodash-es';
import { Observable } from 'rxjs';
import { PagePropertyType, PageSystemPropertyId, } from './schema';
const AFFINE_PROPERTIES_ID = 'affine:workspace-properties';
/**
 * WorkspacePropertiesAdapter is a wrapper for workspace properties.
 * Users should not directly access the workspace properties via yjs, but use this adapter instead.
 *
 * Question for enhancement in the future:
 * May abstract the adapter for each property type, e.g. PagePropertiesAdapter, SchemaAdapter, etc.
 * So that the adapter could be more focused and easier to maintain (like assigning default values)
 * However the properties for an abstraction may not be limited to a single yjs map.
 *
 * @deprecated use docService.doc.properties$
 */
class WorkspacePropertiesAdapter {
    get workspace() {
        return this.workspaceService.workspace;
    }
    constructor(workspaceService) {
        this.workspaceService = workspaceService;
        this.ensuredRoot = false;
        this.ensuredPages = {};
        // leak some yjs abstraction to modify multiple properties at once
        this.transact = this.workspaceService.workspace.docCollection.doc.transact.bind(this.workspaceService.workspace.docCollection.doc);
        // check if properties exists, if not, create one
        const rootDoc = workspaceService.workspace.docCollection.doc;
        this.properties = rootDoc.getMap(AFFINE_PROPERTIES_ID);
        this.proxy = createYProxy(this.properties);
        this.properties$ = LiveData.from(new Observable(observer => {
            const update = () => {
                requestAnimationFrame(() => {
                    observer.next(new Proxy(this.proxy, {}));
                });
            };
            update();
            this.properties.observeDeep(update);
            return () => {
                this.properties.unobserveDeep(update);
            };
        }), this.proxy);
    }
    ensureRootProperties() {
        if (this.ensuredRoot) {
            return;
        }
        this.ensuredRoot = true;
        // TODO(@Peng): deal with schema change issue
        // fixme: may not to be called every time
        defaultsDeep(this.proxy, {
            schema: {
                pageProperties: {
                    custom: {},
                    system: {
                        journal: {
                            id: PageSystemPropertyId.Journal,
                            name: 'Journal',
                            source: 'system',
                            type: PagePropertyType.Date,
                        },
                        tags: {
                            id: PageSystemPropertyId.Tags,
                            name: 'Tags',
                            source: 'system',
                            type: PagePropertyType.Tags,
                            options: this.workspaceService.workspace.docCollection.meta.properties
                                .tags?.options ?? [], // better use a one time migration
                        },
                    },
                },
            },
            pageProperties: {},
        });
    }
    ensurePageProperties(pageId) {
        this.ensureRootProperties();
        if (this.ensuredPages[pageId]) {
            return;
        }
        this.ensuredPages[pageId] = true;
        // fixme: may not to be called every time
        defaultsDeep(this.proxy.pageProperties, {
            [pageId]: {
                custom: {},
                system: {
                    [PageSystemPropertyId.Journal]: {
                        id: PageSystemPropertyId.Journal,
                        value: false,
                    },
                    [PageSystemPropertyId.Tags]: {
                        id: PageSystemPropertyId.Tags,
                        value: [],
                    },
                },
            },
        });
    }
    get schema() {
        return this.proxy.schema;
    }
    /**
     * @deprecated
     */
    get favorites() {
        return this.proxy.favorites;
    }
    get pageProperties() {
        return this.proxy.pageProperties;
    }
    // ====== utilities ======
    getPageProperties(pageId) {
        return this.pageProperties?.[pageId] ?? null;
    }
    getJournalPageDateString(id) {
        return this.pageProperties?.[id]?.system[PageSystemPropertyId.Journal]
            ?.value;
    }
    setJournalPageDateString(id, date) {
        this.ensurePageProperties(id);
        const pageProperties = this.pageProperties?.[id];
        // oxlint-disable-next-line no-non-null-assertion
        pageProperties.system[PageSystemPropertyId.Journal].value = date;
    }
    /**
     * After the user completes the migration, call this function to clear the favorite data
     */
    markFavoritesMigrated() {
        this.proxy.favoritesMigrated = true;
    }
}
export class MigrationFavoriteItemsAdapter extends Service {
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.adapter = new WorkspacePropertiesAdapter(this.workspaceService);
        this.favorites$ = this.adapter.properties$.map(() => this.getItems().filter(i => i.value));
        this.migrated$ = this.adapter.properties$.map(props => props.favoritesMigrated ?? false);
    }
    getItems() {
        return Object.entries(this.adapter.favorites ?? {})
            .filter(([k]) => k.includes(':'))
            .map(([, v]) => v);
    }
    markFavoritesMigrated() {
        this.adapter.markFavoritesMigrated();
    }
}
/**
 * A service written for compatibility,with the same API as old FavoriteItemsAdapter.
 */
export class CompatibleFavoriteItemsAdapter extends Service {
    constructor(favoriteService) {
        super();
        this.favoriteService = favoriteService;
    }
    toggle(id, type) {
        this.favoriteService.favoriteList.toggle(type, id);
    }
    isFavorite$(id, type) {
        return this.favoriteService.favoriteList.isFavorite$(type, id);
    }
    isFavorite(id, type) {
        return this.favoriteService.favoriteList.isFavorite$(type, id).value;
    }
    get favorites$() {
        return this.favoriteService.favoriteList.list$.map(v => v
            .filter(i => i.type === 'doc' || i.type === 'collection') // only support doc and collection
            .map(i => ({
            id: i.id,
            order: '',
            type: i.type,
            value: true,
        })));
    }
}
//# sourceMappingURL=adapter.js.map