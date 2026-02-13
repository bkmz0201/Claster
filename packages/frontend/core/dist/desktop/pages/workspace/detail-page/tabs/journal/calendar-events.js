import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading, toast, Tooltip } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { DocsService } from '@affine/core/modules/doc';
import { IntegrationService, } from '@affine/core/modules/integration';
import { JournalService } from '@affine/core/modules/journal';
import { GuardService } from '@affine/core/modules/permissions';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { FullDayIcon, PeriodIcon, PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useEffect, useMemo, useState } from 'react';
import * as styles from './calendar-events.css';
const pad = (val) => (val ?? 0).toString().padStart(2, '0');
function formatTime(start, end) {
    if (!start || !end)
        return '';
    // Use toJSDate which handles timezone conversion for us
    const startDate = start.toJSDate();
    const endDate = end.toJSDate();
    const from = `${pad(startDate.getHours())}:${pad(startDate.getMinutes())}`;
    const to = `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;
    return from === to ? from : `${from} - ${to}`;
}
export const CalendarEvents = ({ date }) => {
    const calendar = useService(IntegrationService).calendar;
    const events = useLiveData(useMemo(() => calendar.eventsByDate$(date), [calendar, date]));
    useEffect(() => {
        const update = () => {
            calendar.subscriptions$.value.forEach(sub => sub.update());
        };
        update();
        const interval = setInterval(update, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [calendar]);
    return (_jsx("ul", { className: styles.list, children: events.map(event => (_jsx(CalendarEventRenderer, { event: event }, event.id))) }));
};
const CalendarEventRenderer = ({ event }) => {
    const t = useI18n();
    const { url, title, startAt, endAt, allDay, date } = event;
    const [loading, setLoading] = useState(false);
    const calendar = useService(IntegrationService).calendar;
    const docsService = useService(DocsService);
    const guardService = useService(GuardService);
    const journalService = useService(JournalService);
    const workspaceService = useService(WorkspaceService);
    const { createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const subscription = useLiveData(useMemo(() => calendar.subscription$(url), [calendar, url]));
    const config = useLiveData(useMemo(() => subscription?.config$, [subscription?.config$]));
    const name = useLiveData(subscription?.name$) || t['Untitled']();
    const color = config?.color || cssVarV2.button.primary;
    const handleClick = useAsyncCallback(async () => {
        if (!date || loading)
            return;
        const docs = journalService.journalsByDate$(date.format('YYYY-MM-DD')).value;
        if (docs.length === 0)
            return;
        setLoading(true);
        try {
            for (const doc of docs) {
                const canEdit = await guardService.can('Doc_Update', doc.id);
                if (!canEdit) {
                    toast(t['com.affine.no-permission']());
                    continue;
                }
                const newDoc = createPage();
                await docsService.changeDocTitle(newDoc.id, title);
                await docsService.addLinkedDoc(doc.id, newDoc.id);
            }
            track.doc.sidepanel.journal.createCalendarDocEvent();
        }
        finally {
            setLoading(false);
        }
    }, [
        createPage,
        date,
        docsService,
        guardService,
        journalService,
        loading,
        t,
        title,
    ]);
    return (_jsxs("li", { style: assignInlineVars({
            [styles.primaryColor]: color,
        }), className: styles.event, "data-all-day": allDay, onClick: handleClick, children: [_jsx(Tooltip, { align: "start", side: "top", options: {
                    className: styles.nameTooltip,
                    sideOffset: 12,
                    alignOffset: -4,
                }, content: _jsxs("div", { className: styles.nameTooltipContent, children: [_jsx("div", { className: styles.nameTooltipIcon, style: { color } }), _jsx("div", { className: styles.nameTooltipName, children: name })] }), children: _jsx("div", { className: styles.eventIcon, children: allDay ? _jsx(FullDayIcon, {}) : _jsx(PeriodIcon, {}) }) }), _jsx("div", { className: styles.eventTitle, children: title }), loading ? (_jsx(Loading, {})) : (_jsxs("div", { className: styles.eventCaption, children: [_jsx("span", { className: styles.eventTime, children: allDay
                            ? t['com.affine.integration.calendar.all-day']()
                            : formatTime(startAt, endAt) }), _jsxs("span", { className: styles.eventNewDoc, children: [_jsx(PlusIcon, { style: { fontSize: 18 } }), t['com.affine.integration.calendar.new-doc']()] })] }))] }));
};
//# sourceMappingURL=calendar-events.js.map