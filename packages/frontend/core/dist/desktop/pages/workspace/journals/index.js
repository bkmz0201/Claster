import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, WeekDatePicker, } from '@affine/component';
import { BlocksuiteEditorJournalDocTitleUI } from '@affine/core/blocksuite/block-suite-editor/journal-doc-title';
import { JOURNAL_DATE_FORMAT, JournalService, } from '@affine/core/modules/journal';
import { ViewBody, ViewHeader, ViewIcon, ViewService, ViewTitle, WorkbenchService, } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import dayjs from 'dayjs';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { AllDocSidebarTabs } from '../layouts/all-doc-sidebar-tabs';
import * as styles from './index.css';
export function getDateFromUrl(location) {
    const searchParams = new URLSearchParams(location.search);
    const date = searchParams.get('date')
        ? dayjs(searchParams.get('date'))
        : dayjs();
    return date.format(JOURNAL_DATE_FORMAT);
}
export const JournalPlaceholder = ({ dateString }) => {
    const t = useI18n();
    const [redirecting, setRedirecting] = useState(false);
    const workbench = useService(WorkbenchService).workbench;
    const journalService = useService(JournalService);
    const createJournal = useCallback(() => {
        if (redirecting)
            return;
        setRedirecting(true);
        const doc = journalService.ensureJournalByDate(dateString);
        workbench.openDoc(doc.id, {
            replaceHistory: true,
            at: 'active',
        });
    }, [dateString, journalService, redirecting, workbench]);
    return (_jsx("div", { className: styles.body, "data-mobile": BUILD_CONFIG.isMobileEdition, children: _jsxs("div", { className: styles.content, children: [_jsx(BlocksuiteEditorJournalDocTitleUI, { date: dateString, overrideClassName: styles.docTitleContainer }), _jsxs("div", { className: styles.placeholder, children: [_jsx("div", { className: styles.placeholderIcon, children: _jsx(TodayIcon, {}) }), _jsx("div", { className: styles.placeholderText, children: t['com.affine.journal.placeholder.title']() }), _jsx(Button, { variant: "primary", onClick: createJournal, "data-testid": "confirm-create-journal-button", children: t['com.affine.journal.placeholder.create']() })] })] }) }));
};
const weekStyle = { maxWidth: 800, width: '100%' };
// this route page acts as a redirector to today's journal
export const JournalsPageWithConfirmation = () => {
    const handleRef = useRef(null);
    const t = useI18n();
    const journalService = useService(JournalService);
    const workbench = useService(WorkbenchService).workbench;
    const view = useService(ViewService).view;
    const location = useLiveData(view.location$);
    const dateString = getDateFromUrl(location);
    const todayString = dayjs().format(JOURNAL_DATE_FORMAT);
    const isToday = dateString === todayString;
    const [ready, setReady] = useState(false);
    const openJournal = useCallback((date) => {
        workbench.open(`/journals?date=${date}`, { at: 'active' });
    }, [workbench]);
    useLayoutEffect(() => {
        // only handle current route
        if (!location.pathname.startsWith('/journals'))
            return;
        // check if the journal is created
        const docs = journalService.journalsByDate$(dateString).value;
        if (docs.length === 0) {
            setReady(true);
            return;
        }
        // if created, redirect to the journal
        const journal = docs[0];
        workbench.openDoc(journal.id, { replaceHistory: true, at: 'active' });
    }, [dateString, journalService, location.pathname, view, workbench]);
    if (!ready)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(ViewTitle, { title: "" }), _jsx(ViewIcon, { icon: "journal" }), _jsx(ViewHeader, { children: _jsxs("div", { className: styles.header, children: [_jsx(WeekDatePicker, { "data-testid": "journal-week-picker", handleRef: handleRef, style: weekStyle, value: dateString, onChange: openJournal }), !isToday ? (_jsx(Button, { className: styles.todayButton, onClick: () => openJournal(todayString), children: t['com.affine.today']() })) : null] }) }), _jsx(ViewBody, { children: _jsx(JournalPlaceholder, { dateString: dateString }) }), _jsx(AllDocSidebarTabs, {})] }));
};
export const Component = () => {
    return _jsx(JournalsPageWithConfirmation, {});
};
//# sourceMappingURL=index.js.map