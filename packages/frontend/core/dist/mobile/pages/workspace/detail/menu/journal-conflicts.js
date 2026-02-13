import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, MobileMenu, MobileMenuItem, MobileMenuSub, useConfirmModal, } from '@affine/component';
import { Guard } from '@affine/core/components/guard';
import { MoveToTrash } from '@affine/core/components/page-list';
import { DocService, DocsService, } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { JournalService } from '@affine/core/modules/journal';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { CalendarXmarkIcon, EditIcon, TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import * as styles from './journal-conflicts.css';
export const ResolveConflictOperations = ({ docRecord, }) => {
    const t = useI18n();
    const journalService = useService(JournalService);
    const { openConfirmModal } = useConfirmModal();
    const handleOpenTrashModal = useCallback((docRecord) => {
        openConfirmModal({
            title: t['com.affine.moveToTrash.confirmModal.title'](),
            description: t['com.affine.moveToTrash.confirmModal.description']({
                title: docRecord.title$.value || t['Untitled'](),
            }),
            cancelText: t['com.affine.confirmModal.button.cancel'](),
            confirmText: t.Delete(),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm: () => {
                docRecord.moveToTrash();
            },
        });
    }, [openConfirmModal, t]);
    const handleRemoveJournalMark = useCallback((docId) => {
        journalService.removeJournalDate(docId);
    }, [journalService]);
    return (_jsxs(_Fragment, { children: [_jsx(Guard, { docId: docRecord.id, permission: "Doc_Update", children: canEdit => (_jsx(MobileMenuItem, { prefixIcon: _jsx(CalendarXmarkIcon, {}), onClick: () => {
                        handleRemoveJournalMark(docRecord.id);
                    }, "data-testid": "journal-conflict-remove-mark", disabled: !canEdit, children: t['com.affine.page-properties.property.journal-remove']() })) }), _jsx(Guard, { docId: docRecord.id, permission: "Doc_Trash", children: canTrash => (_jsx(MoveToTrash, { onSelect: () => handleOpenTrashModal(docRecord), disabled: !canTrash })) })] }));
};
const preventNav = (e) => {
    e.stopPropagation();
    e.preventDefault();
};
const DocItem = ({ docRecord }) => {
    const docId = docRecord.id;
    const i18n = useI18n();
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const Icon = useLiveData(docDisplayMetaService.icon$(docId));
    const title = useLiveData(docDisplayMetaService.title$(docId));
    return (_jsx(WorkbenchLink, { "aria-label": title, to: `/${docId}`, children: _jsx(MobileMenuItem, { prefixIcon: _jsx(Icon, {}), suffix: _jsx(MobileMenu, { items: _jsx(ResolveConflictOperations, { docRecord: docRecord }), children: _jsx(IconButton, { onClick: preventNav, icon: _jsx(EditIcon, {}) }) }), children: _jsxs("div", { className: styles.docItem, children: [title, _jsx("div", { className: styles.duplicateTag, children: i18n['com.affine.page-properties.property.journal-duplicated']() })] }) }) }));
};
export const ConflictList = ({ docRecords }) => {
    return docRecords.map(docRecord => (_jsx(DocItem, { docRecord: docRecord }, docRecord.id)));
};
export const MobileJournalConflictList = ({ date }) => {
    const docRecordList = useService(DocsService).list;
    const journalService = useService(JournalService);
    const docs = useLiveData(useMemo(() => journalService.journalsByDate$(date), [journalService, date]));
    const docRecords = useLiveData(docRecordList.docs$.map(records => records.filter(v => {
        return docs.some(doc => doc.id === v.id);
    })));
    return _jsx(ConflictList, { docRecords: docRecords });
};
const ConflictListMenuItem = ({ docRecords }) => {
    const t = useI18n();
    return (_jsx(MobileMenuSub, { triggerOptions: {
            prefixIcon: _jsx(TodayIcon, {}),
            type: 'danger',
        }, items: _jsx(ConflictList, { docRecords: docRecords }), children: t['com.affine.m.selector.journal-menu.conflicts']() }));
};
const JournalConflictsChecker = ({ date }) => {
    const docRecordList = useService(DocsService).list;
    const journalService = useService(JournalService);
    const docs = useLiveData(useMemo(() => journalService.journalsByDate$(date), [journalService, date]));
    const docRecords = useLiveData(docRecordList.docs$.map(records => records.filter(v => {
        return docs.some(doc => doc.id === v.id);
    })));
    if (docRecords.length <= 1)
        return null;
    return _jsx(ConflictListMenuItem, { docRecords: docRecords });
};
export const JournalConflictsMenuItem = () => {
    const journalService = useService(JournalService);
    const docId = useService(DocService).doc.id;
    const journalDate = useLiveData(journalService.journalDate$(docId));
    if (!journalDate)
        return null;
    return _jsx(JournalConflictsChecker, { date: journalDate });
};
//# sourceMappingURL=journal-conflicts.js.map