import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DatePicker, IconButton, Menu, MenuItem, MenuSeparator, Scrollable, useConfirmModal, } from '@affine/component';
import { Guard } from '@affine/core/components/guard';
import { MoveToTrash } from '@affine/core/components/page-list';
import { DocService, DocsService, } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { JournalService } from '@affine/core/modules/journal';
import { WorkbenchLink, WorkbenchService, } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { CalendarXmarkIcon, EditIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useCallback, useMemo, useRef, useState } from 'react';
import { CalendarEvents } from './calendar-events';
import * as styles from './journal.css';
import { JournalTemplateOnboarding } from './template-onboarding';
import { JournalTemplateSetting } from './template-setting';
/**
 * @internal
 */
const CountDisplay = ({ count, max = 99, ...attrs }) => {
    return _jsx("span", { ...attrs, children: count > max ? `${max}+` : count });
};
const PageItem = ({ docId, right, duplicate, className, ...attrs }) => {
    const i18n = useI18n();
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const Icon = useLiveData(docDisplayMetaService.icon$(docId));
    const title = useLiveData(docDisplayMetaService.title$(docId));
    return (_jsxs(WorkbenchLink, { "data-testid": "journal-conflict-item", "aria-label": title, to: `/${docId}`, className: clsx(className, styles.pageItem), ...attrs, children: [_jsx("div", { className: styles.pageItemIcon, children: _jsx(Icon, { width: 20, height: 20 }) }), _jsxs("div", { className: styles.pageItemLabel, children: [title, duplicate ? (_jsx("div", { className: styles.duplicateTag, children: i18n['com.affine.page-properties.property.journal-duplicated']() })) : null] }), right] }));
};
const mobile = environment.isMobile;
export const EditorJournalPanel = () => {
    const t = useI18n();
    const doc = useServiceOptional(DocService)?.doc;
    const workbench = useService(WorkbenchService).workbench;
    const journalService = useService(JournalService);
    const journalDateStr = useLiveData(doc ? journalService.journalDate$(doc.id) : null);
    const journalDate = journalDateStr ? dayjs(journalDateStr) : null;
    const isJournal = !!journalDate;
    const openJournal = useCallback((date) => {
        const docs = journalService.journalsByDate$(date).value;
        if (docs.length > 0) {
            workbench.openDoc(docs[0].id, { at: 'active' });
        }
        else {
            workbench.open(`/journals?date=${date}`, { at: 'active' });
        }
    }, [journalService, workbench]);
    const onDateSelect = useCallback((date) => {
        if (journalDate && dayjs(date).isSame(dayjs(journalDate)))
            return;
        openJournal(date);
    }, [journalDate, openJournal]);
    const allJournalDates = useLiveData(journalService.allJournalDates$);
    const customDayRenderer = useCallback((cell) => {
        const hasJournal = allJournalDates.has(cell.date.format('YYYY-MM-DD'));
        return (_jsxs("button", { className: styles.journalDateCell, "data-is-date-cell": true, tabIndex: cell.focused ? 0 : -1, "data-is-today": cell.isToday, "data-not-current-month": cell.notCurrentMonth, "data-selected": cell.selected, "data-is-journal": isJournal, "data-has-journal": hasJournal, "data-mobile": mobile, children: [cell.label, hasJournal && !cell.selected ? (_jsx("div", { className: styles.journalDateCellDot })) : null] }));
    }, [allJournalDates, isJournal]);
    return (_jsxs("div", { className: styles.journalPanel, "data-is-journal": isJournal, "data-testid": "sidebar-journal-panel", children: [_jsx("div", { "data-mobile": mobile, className: styles.calendar, children: _jsx(DatePicker, { weekDays: t['com.affine.calendar-date-picker.week-days'](), monthNames: t['com.affine.calendar-date-picker.month-names'](), todayLabel: t['com.affine.calendar-date-picker.today'](), customDayRenderer: customDayRenderer, value: journalDate?.format('YYYY-MM-DD'), onChange: onDateSelect, cellSize: 34 }) }), _jsx(JournalTemplateOnboarding, {}), journalDate ? (_jsxs(_Fragment, { children: [_jsx(JournalConflictBlock, { date: journalDate }), _jsx(CalendarEvents, { date: journalDate }), _jsx(JournalDailyCountBlock, { date: journalDate })] })) : (_jsx("div", { className: styles.spacer })), _jsx(JournalTemplateSetting, {})] }));
};
export const sortPagesByDate = (docs, field, order = 'desc') => {
    return [...docs].sort((a, b) => {
        return ((order === 'asc' ? 1 : -1) *
            dayjs(b.meta$.value[field]).diff(dayjs(a.meta$.value[field])));
    });
};
const DailyCountEmptyFallback = ({ name }) => {
    const t = useI18n();
    return (_jsx("div", { className: styles.dailyCountEmpty, children: name === 'createdToday'
            ? t['com.affine.journal.daily-count-created-empty-tips']()
            : t['com.affine.journal.daily-count-updated-empty-tips']() }));
};
const JournalDailyCountBlock = ({ date }) => {
    const nodeRef = useRef(null);
    const t = useI18n();
    const [activeItem, setActiveItem] = useState('createdToday');
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
    const headerItems = useMemo(() => [
        {
            name: 'createdToday',
            label: t['com.affine.journal.created-today'](),
            count: createdToday.length,
        },
        {
            name: 'updatedToday',
            label: t['com.affine.journal.updated-today'](),
            count: updatedToday.length,
        },
    ], [createdToday.length, t, updatedToday.length]);
    const activeIndex = headerItems.findIndex(({ name }) => name === activeItem);
    const vars = assignInlineVars({
        '--active-index': String(activeIndex),
        '--item-count': String(headerItems.length),
    });
    return (_jsxs("div", { className: styles.dailyCount, style: vars, children: [_jsx("header", { className: styles.dailyCountHeader, children: headerItems.map(({ label, count, name }, index) => {
                    return (_jsxs("button", { onClick: () => setActiveItem(name), "aria-selected": activeItem === name, className: styles.dailyCountNav, children: [label, "\u00A0", _jsx(CountDisplay, { count: count })] }, index));
                }) }), _jsx("main", { className: styles.dailyCountContainer, "data-active": activeItem, children: headerItems.map(({ name }) => {
                    const renderList = name === 'createdToday' ? createdToday : updatedToday;
                    if (renderList.length === 0)
                        return (_jsx("div", { className: styles.dailyCountItem, children: _jsx(DailyCountEmptyFallback, { name: name }) }, name));
                    return (_jsxs(Scrollable.Root, { className: styles.dailyCountItem, children: [_jsx(Scrollable.Scrollbar, {}), _jsx(Scrollable.Viewport, { children: _jsx("div", { className: styles.dailyCountContent, ref: nodeRef, children: renderList.map((pageRecord, index) => (_jsx(PageItem, { tabIndex: name === activeItem ? 0 : -1, docId: pageRecord.id }, index))) }) })] }, name));
                }) })] }));
};
const MAX_CONFLICT_COUNT = 5;
const ConflictList = ({ docRecords, children, className, ...attrs }) => {
    const t = useI18n();
    const currentDoc = useService(DocService).doc;
    const journalService = useService(JournalService);
    const { openConfirmModal } = useConfirmModal();
    const handleOpenTrashModal = useCallback((docRecord) => {
        openConfirmModal({
            title: t['com.affine.moveToTrash.confirmModal.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: docRecord.title$.value || t['Untitled'](),
            }),
            cancelText: t['com.affine.confirmModal.button.cancel'](),
            confirmButtonOptions: {
                variant: 'error',
            },
            confirmText: t.Delete(),
            onConfirm: () => {
                docRecord.moveToTrash();
            },
        });
    }, [openConfirmModal, t]);
    const handleRemoveJournalMark = useCallback((docId) => {
        journalService.removeJournalDate(docId);
    }, [journalService]);
    return (_jsxs("div", { "data-testid": "journal-conflict-list", className: clsx(styles.journalConflictWrapper, className), ...attrs, children: [docRecords.map(docRecord => {
                const isCurrent = docRecord.id === currentDoc.id;
                return (_jsx(PageItem, { "aria-selected": isCurrent, docId: docRecord.id, duplicate: true, right: _jsx(Menu, { contentOptions: {
                            style: { width: 237, maxWidth: '100%' },
                            align: 'end',
                            alignOffset: -4,
                            sideOffset: 8,
                        }, items: _jsxs(_Fragment, { children: [_jsx(Guard, { docId: docRecord.id, permission: "Doc_Update", children: canEdit => (_jsx(MenuItem, { prefixIcon: _jsx(CalendarXmarkIcon, {}), onClick: e => {
                                            e.stopPropagation();
                                            handleRemoveJournalMark(docRecord.id);
                                        }, "data-testid": "journal-conflict-remove-mark", disabled: !canEdit, children: t['com.affine.page-properties.property.journal-remove']() })) }), _jsx(MenuSeparator, {}), _jsx(Guard, { docId: docRecord.id, permission: "Doc_Trash", children: canTrash => (_jsx(MoveToTrash, { onSelect: () => handleOpenTrashModal(docRecord), disabled: !canTrash })) })] }), children: _jsx(IconButton, { "data-testid": "journal-conflict-edit", icon: _jsx(EditIcon, {}) }) }) }, docRecord.id));
            }), children] }));
};
const JournalConflictBlock = ({ date }) => {
    const t = useI18n();
    const docRecordList = useService(DocsService).list;
    const journalService = useService(JournalService);
    const dateString = date.format('YYYY-MM-DD');
    const docs = useLiveData(useMemo(() => journalService.journalsByDate$(dateString), [dateString, journalService]));
    const docRecords = useLiveData(docRecordList.docs$.map(records => records.filter(v => {
        return docs.some(doc => doc.id === v.id);
    })));
    if (docs.length <= 1)
        return null;
    return (_jsx(ConflictList, { className: styles.journalConflictBlock, docRecords: docRecords.slice(0, MAX_CONFLICT_COUNT), children: docs.length > MAX_CONFLICT_COUNT ? (_jsx(Menu, { items: _jsx(ConflictList, { docRecords: docRecords.slice(MAX_CONFLICT_COUNT) }), children: _jsx("div", { className: styles.journalConflictMoreTrigger, children: t['com.affine.journal.conflict-show-more']({
                    count: (docRecords.length - MAX_CONFLICT_COUNT).toFixed(0),
                }) }) })) : null }));
};
//# sourceMappingURL=index.js.map