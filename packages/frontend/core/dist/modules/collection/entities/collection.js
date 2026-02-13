import { Entity, LiveData } from '@toeverything/infra';
import { uniq } from 'lodash-es';
import { map, switchMap } from 'rxjs';
export class Collection extends Entity {
    constructor(store, rulesService) {
        super();
        this.store = store;
        this.rulesService = rulesService;
        this.id = this.props.id;
        this.info$ = LiveData.from(this.store.watchCollectionInfo(this.id).pipe(map(info => ({
            // default fields in case collection info is not found
            name: '',
            id: this.id,
            rules: {
                filters: [],
            },
            allowList: [],
            ...info,
        }))), {});
        this.name$ = this.info$.map(info => info.name);
        this.allowList$ = this.info$.map(info => info.allowList);
        this.rules$ = this.info$.map(info => info.rules);
    }
    /**
     * Returns a list of document IDs that match the collection rules and allow list.
     *
     * For performance optimization,
     * Developers must explicitly call `watch()` to retrieve the result and properly manage the subscription lifecycle.
     */
    watch() {
        return this.info$.pipe(switchMap(info => {
            return this.rulesService
                .watch({
                filters: info.rules.filters,
                extraAllowList: info.allowList,
                extraFilters: [
                    {
                        type: 'system',
                        key: 'trash',
                        method: 'is',
                        value: 'false',
                    },
                    {
                        type: 'system',
                        key: 'empty-journal',
                        method: 'is',
                        value: 'false',
                    },
                ],
            })
                .pipe(map(result => result.groups.flatMap(group => group.items)));
        }));
    }
    updateInfo(info) {
        this.store.updateCollectionInfo(this.id, info);
    }
    addDoc(...docIds) {
        this.store.updateCollectionInfo(this.id, {
            allowList: uniq([...this.info$.value.allowList, ...docIds]),
        });
    }
    removeDoc(...docIds) {
        this.store.updateCollectionInfo(this.id, {
            allowList: this.info$.value.allowList.filter(id => !docIds.includes(id)),
        });
    }
}
//# sourceMappingURL=collection.js.map