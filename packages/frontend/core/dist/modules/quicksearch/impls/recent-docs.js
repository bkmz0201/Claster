import { Entity, LiveData } from '@toeverything/infra';
const group = {
    id: 'recent-docs',
    label: {
        i18nKey: 'com.affine.cmdk.affine.category.affine.recent',
    },
    score: 15,
};
export class RecentDocsQuickSearchSession extends Entity {
    constructor(recentDocsService, docDisplayMetaService) {
        super();
        this.recentDocsService = recentDocsService;
        this.docDisplayMetaService = docDisplayMetaService;
        this.query$ = new LiveData('');
        this.items$ = LiveData.computed(get => {
            const query = get(this.query$);
            if (query) {
                return []; /* recent docs only for empty query */
            }
            const docRecords = this.recentDocsService.getRecentDocs();
            return docRecords
                .filter(doc => !get(doc.trash$))
                .map(docRecord => {
                const { title, icon } = this.docDisplayMetaService.getDocDisplayMeta(docRecord);
                return {
                    id: 'recent-doc:' + docRecord.id,
                    source: 'recent-doc',
                    group: group,
                    label: {
                        title: title,
                    },
                    score: 0,
                    icon,
                    timestamp: docRecord.meta$.value.updatedDate,
                    payload: { docId: docRecord.id },
                };
            });
        });
    }
    query(query) {
        this.query$.next(query);
    }
}
//# sourceMappingURL=recent-docs.js.map