import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuSeparator, MobileMenuSub } from '@affine/component';
import { sortPagesByDate } from '@affine/core/desktop/pages/workspace/detail-page/tabs/journal';
import { DocService, DocsService, } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { JournalService } from '@affine/core/modules/journal';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { HistoryIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import * as styles from './journal-today-activity.css';
const DocItem = ({ docId }) => {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const Icon = useLiveData(docDisplayMetaService.icon$(docId));
    const title = useLiveData(docDisplayMetaService.title$(docId));
    return (_jsx(WorkbenchLink, { "aria-label": title, to: `/${docId}`, children: _jsx(MenuItem, { prefixIcon: _jsx(Icon, {}), children: title }) }));
};
const ActivityBlock = ({ name, list, }) => {
    const t = useI18n();
    const title = name === 'created'
        ? t['com.affine.journal.created-today']()
        : t['com.affine.journal.updated-today']();
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.title, children: title }), list.length > 0 ? (list.map(doc => {
                return _jsx(DocItem, { docId: doc.id }, doc.id);
            })) : (_jsx("div", { className: styles.empty, children: name === 'created'
                    ? t['com.affine.journal.daily-count-created-empty-tips']()
                    : t['com.affine.journal.daily-count-updated-empty-tips']() }))] }));
};
const TodaysActivity = ({ date }) => {
    const docRecords = useLiveData(useService(DocsService).list.docs$);
    const getTodaysPages = useCallback((field) => {
        return sortPagesByDate(docRecords.filter(docRecord => {
            const meta = docRecord.meta$.value;
            if (meta.trash)
                return false;
            return meta[field] && dayjs(meta[field]).isSame(date, 'day');
        }), field);
    }, [date, docRecords]);
    const createdToday = useMemo(() => getTodaysPages('createDate'), [getTodaysPages]);
    const updatedToday = useMemo(() => getTodaysPages('updatedDate'), [getTodaysPages]);
    return (_jsxs(_Fragment, { children: [_jsx(ActivityBlock, { name: "created", list: createdToday }), _jsx(MenuSeparator, {}), _jsx(ActivityBlock, { name: "updated", list: updatedToday })] }));
};
export const JournalTodayActivityMenuItem = ({ prefix, suffix, }) => {
    const docService = useService(DocService);
    const journalService = useService(JournalService);
    const docId = docService.doc.id;
    const journalDate = useLiveData(journalService.journalDate$(docId));
    const t = useI18n();
    if (!journalDate)
        return null;
    return (_jsxs(_Fragment, { children: [prefix, _jsx(MobileMenuSub, { triggerOptions: {
                    prefixIcon: _jsx(HistoryIcon, {}),
                }, items: _jsx(TodaysActivity, { date: journalDate }), title: t['com.affine.m.selector.journal-menu.today-activity'](), children: t['com.affine.m.selector.journal-menu.today-activity']() }), suffix] }));
};
//# sourceMappingURL=journal-today-activity.js.map