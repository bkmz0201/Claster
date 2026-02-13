import { NewXxxEdgelessIcon, NewXxxPageIcon } from '@blocksuite/icons/rc';
import { Entity, LiveData } from '@toeverything/infra';
const group = {
    id: 'creation',
    label: { i18nKey: 'com.affine.quicksearch.group.creation' },
    score: 0,
};
export class CreationQuickSearchSession extends Entity {
    constructor() {
        super(...arguments);
        this.query$ = new LiveData('');
        this.items$ = LiveData.computed(get => {
            const query = get(this.query$);
            if (!query.trim()) {
                return [];
            }
            return [
                {
                    id: 'creation:create-page',
                    source: 'creation',
                    label: {
                        i18nKey: 'com.affine.cmdk.affine.create-new-page-as',
                        options: { keyWord: query },
                    },
                    group,
                    icon: NewXxxPageIcon,
                    payload: { mode: 'edgeless', title: query },
                },
                {
                    id: 'creation:create-edgeless',
                    source: 'creation',
                    label: {
                        i18nKey: 'com.affine.cmdk.affine.create-new-edgeless-as',
                        options: { keyWord: query },
                    },
                    group,
                    icon: NewXxxEdgelessIcon,
                    payload: { mode: 'edgeless', title: query },
                },
            ];
        });
    }
    query(query) {
        this.query$.next(query);
    }
}
//# sourceMappingURL=creation.js.map