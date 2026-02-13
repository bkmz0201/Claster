import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, DatePicker, Menu, MenuItem, PropertyValue, } from '@affine/component';
import { MobileJournalConflictList } from '@affine/core/mobile/pages/workspace/detail/menu/journal-conflicts';
import { DocService } from '@affine/core/modules/doc';
import { JournalService } from '@affine/core/modules/journal';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { ViewService } from '@affine/core/modules/workbench/services/view';
import { i18nTime, useI18n } from '@affine/i18n';
import { TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import * as styles from './journal.css';
const stopPropagation = (e) => e.stopPropagation();
export const JournalValue = ({ readonly }) => {
    const t = useI18n();
    const journalService = useService(JournalService);
    const doc = useService(DocService).doc;
    const journalDate = useLiveData(journalService.journalDate$(doc.id));
    const checked = !!journalDate;
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const displayDate = useMemo(() => i18nTime(selectedDate, {
        absolute: { accuracy: 'day' },
    }), [selectedDate]);
    const docs = useLiveData(useMemo(() => journalService.journalsByDate$(selectedDate), [journalService, selectedDate]));
    const conflict = docs.length > 1;
    useEffect(() => {
        if (journalDate)
            setSelectedDate(journalDate);
    }, [journalDate]);
    const handleDateSelect = useCallback((day) => {
        const date = dayjs(day).format('YYYY-MM-DD');
        setSelectedDate(date);
        journalService.setJournalDate(doc.id, date);
    }, [journalService, doc.id]);
    const handleCheck = useCallback((_, v) => {
        if (!v) {
            journalService.removeJournalDate(doc.id);
            setShowDatePicker(false);
        }
        else {
            handleDateSelect(selectedDate);
        }
    }, [journalService, doc.id, handleDateSelect, selectedDate]);
    const workbench = useService(WorkbenchService).workbench;
    const activeView = useLiveData(workbench.activeView$);
    const view = useServiceOptional(ViewService)?.view ?? activeView;
    const handleOpenDuplicate = useCallback((e) => {
        e.stopPropagation();
        workbench.openSidebar();
        view.activeSidebarTab('journal');
    }, [view, workbench]);
    const propertyRef = useRef(null);
    const toggle = useCallback((e) => {
        if (readonly)
            return;
        if (propertyRef.current?.contains(e.target)) {
            handleCheck(null, !checked);
        }
    }, [checked, handleCheck, readonly]);
    return (_jsx(PropertyValue, { ref: propertyRef, className: styles.property, onClick: toggle, readonly: readonly, children: _jsxs("div", { className: styles.root, children: [_jsx(Checkbox, { className: styles.checkbox, checked: checked, disabled: readonly }), checked ? (_jsx(Menu, { contentOptions: {
                        onClick: e => e.stopPropagation(),
                        sideOffset: 10,
                        alignOffset: -30,
                        style: { padding: '15px 20px' },
                    }, rootOptions: {
                        modal: true,
                        open: !readonly && showDatePicker,
                        onOpenChange: setShowDatePicker,
                    }, items: _jsx(DatePicker, { weekDays: t['com.affine.calendar-date-picker.week-days'](), monthNames: t['com.affine.calendar-date-picker.month-names'](), todayLabel: t['com.affine.calendar-date-picker.today'](), value: selectedDate, onChange: handleDateSelect }), children: _jsx("div", { "data-testid": "date-selector", className: styles.date, onClick: e => {
                            e.stopPropagation();
                        }, "data-disabled": readonly ? 'true' : undefined, children: displayDate }) })) : null, checked && conflict ? (BUILD_CONFIG.isMobileEdition ? (_jsx(Menu, { items: _jsx(MobileJournalConflictList, { date: selectedDate }), children: _jsx("div", { "data-testid": "conflict-tag", className: styles.duplicateTag, onClick: stopPropagation, children: t['com.affine.page-properties.property.journal-duplicated']() }) })) : (_jsx("div", { "data-testid": "conflict-tag", className: styles.duplicateTag, onClick: handleOpenDuplicate, children: t['com.affine.page-properties.property.journal-duplicated']() }))) : null] }) }));
};
export const JournalFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'true',
                        });
                    }, selected: filter.value === 'true', children: 'True' }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'false',
                        });
                    }, selected: filter.value !== 'true', children: 'False' })] }), children: _jsx("span", { children: filter.value === 'true' ? 'True' : 'False' }) }));
};
export const JournalDocListProperty = ({ doc }) => {
    const journalService = useService(JournalService);
    const journalDate = useLiveData(journalService.journalDate$(doc.id));
    if (!journalDate) {
        return null;
    }
    return (_jsx(StackProperty, { icon: _jsx(TodayIcon, {}), children: i18nTime(journalDate, { absolute: { accuracy: 'day' } }) }));
};
export const JournalGroupHeader = ({ groupId, docCount }) => {
    const t = useI18n();
    const text = groupId === 'true'
        ? t['com.affine.all-docs.group.is-journal']()
        : t['com.affine.all-docs.group.is-not-journal']();
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
//# sourceMappingURL=journal.js.map