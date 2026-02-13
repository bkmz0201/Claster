import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Menu } from '@affine/component';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { JournalService } from '@affine/core/modules/journal';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { EditIcon, TodayIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import * as styles from './journal-conflict-block.css';
import { ResolveConflictOperations } from './menu/journal-conflicts';
export const JournalConflictBlock = ({ date }) => {
    return date ? _jsx(JournalConflictChecker, { date: date }) : null;
};
const JournalConflictChecker = ({ date }) => {
    const docRecordList = useService(DocsService).list;
    const journalService = useService(JournalService);
    const docs = useLiveData(useMemo(() => journalService.journalsByDate$(date), [journalService, date]));
    const docRecords = useLiveData(docRecordList.docs$.map(records => records.filter(v => {
        return docs.some(doc => doc.id === v.id);
    })));
    if (docRecords.length <= 1)
        return null;
    return _jsx(JournalConflictList, { docRecords: docRecords });
};
const JournalConflictList = ({ docRecords }) => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.body, children: [_jsx("div", { className: styles.header, children: t['com.affine.editor.journal-conflict.title']() }), docRecords.map(docRecord => (_jsx(ConflictItem, { docRecord: docRecord }, docRecord.id)))] }), _jsx("div", { className: styles.separator })] }));
};
const ConflictItem = ({ docRecord }) => {
    const docId = docRecord.id;
    const i18n = useI18n();
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const title = useLiveData(docDisplayMetaService.title$(docId));
    return (_jsxs(WorkbenchLink, { className: styles.docItem, to: `/${docId}`, children: [_jsx(TodayIcon, { className: styles.icon }), _jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.title, children: title }), _jsx("div", { className: styles.duplicatedTag, children: i18n['com.affine.page-properties.property.journal-duplicated']() })] }), _jsx(Menu, { items: _jsx(ResolveConflictOperations, { docRecord: docRecord }), children: _jsx(IconButton, { className: styles.edit, icon: _jsx(EditIcon, {}) }) })] }));
};
//# sourceMappingURL=journal-conflict-block.js.map