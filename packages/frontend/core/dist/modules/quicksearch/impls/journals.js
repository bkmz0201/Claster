import { I18n, i18nTime } from '@affine/i18n';
import { DateTimeIcon } from '@blocksuite/icons/rc';
import { Entity, LiveData } from '@toeverything/infra';
import { suggestJournalDate } from '../../journal';
const group = {
    id: 'journals',
    label: {
        i18nKey: 'com.affine.cmdk.affine.category.affine.journal',
    },
    score: 0,
};
export class JournalsQuickSearchSession extends Entity {
    constructor(journalService, dialogService, docDisplayMetaService) {
        super();
        this.journalService = journalService;
        this.dialogService = dialogService;
        this.docDisplayMetaService = docDisplayMetaService;
        this.query$ = new LiveData('');
        this.items$ = LiveData.computed(get => {
            const getDateDocId = (date) => {
                if (date) {
                    return this.journalService.ensureJournalByDate(date).id;
                }
                return undefined;
            };
            const items = [
                {
                    icon: DateTimeIcon,
                    id: 'journal:pick-a-date',
                    source: 'date-picker',
                    group: group,
                    label: {
                        title: I18n.t('com.affine.cmdk.affine.category.affine.date-picker'),
                    },
                    score: 0,
                    payload: {
                        getDocId: () => {
                            return new Promise(resolve => {
                                const id = this.dialogService.open('date-selector', {
                                    onSelect: date => {
                                        resolve(getDateDocId(date));
                                        this.dialogService.close(id);
                                    },
                                });
                            });
                        },
                    },
                },
            ];
            const query = get(this.query$);
            const suggestedDate = suggestJournalDate(query);
            if (suggestedDate) {
                const { dateString, alias } = suggestedDate;
                const dateDisplay = i18nTime(dateString, {
                    absolute: { accuracy: 'day' },
                });
                const icon = this.docDisplayMetaService.getJournalIcon(dateString, {
                    type: 'rc',
                });
                items.unshift({
                    icon,
                    id: 'journal:date-' + dateString,
                    source: 'date-picker',
                    group: group,
                    label: {
                        title: alias ? `${alias}, ${dateDisplay}` : dateDisplay,
                    },
                    score: 0,
                    payload: {
                        getDocId: () => Promise.resolve(getDateDocId(dateString)),
                    },
                });
            }
            return items;
        });
    }
    query(query) {
        this.query$.next(query);
    }
}
//# sourceMappingURL=journals.js.map