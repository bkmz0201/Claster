import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Menu, MenuItem, MenuSeparator } from '@affine/component';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { TemplateDocService } from '@affine/core/modules/template-doc';
import { TemplateListMenuContentScrollable } from '@affine/core/modules/template-doc/view/template-list-menu';
import { useI18n } from '@affine/i18n';
import { DeleteIcon, TemplateIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import * as styles from './template-setting.css';
export const JournalTemplateSetting = () => {
    const t = useI18n();
    const templateDocService = useService(TemplateDocService);
    const docDisplayService = useService(DocDisplayMetaService);
    const journalTemplateDocId = useLiveData(templateDocService.setting.journalTemplateDocId$);
    const docsService = useService(DocsService);
    const title = useLiveData(useMemo(() => {
        return journalTemplateDocId
            ? docDisplayService.title$(journalTemplateDocId)
            : null;
    }, [docDisplayService, journalTemplateDocId]));
    const journalTemplateDoc = useLiveData(journalTemplateDocId ? docsService.list.doc$(journalTemplateDocId) : null);
    const isDeleted = useLiveData(journalTemplateDoc?.trash$);
    const updateJournalTemplate = useCallback((templateId) => {
        templateDocService.setting.updateJournalTemplateDocId(templateId);
    }, [templateDocService.setting]);
    const removeJournalTemplate = useCallback(() => {
        updateJournalTemplate();
    }, [updateJournalTemplate]);
    return (_jsxs("div", { className: styles.container, children: [_jsx(Menu, { contentOptions: { className: styles.menu }, items: _jsx(TemplateListMenuContentScrollable, { onSelect: updateJournalTemplate, suffixItems: journalTemplateDocId ? (_jsxs(_Fragment, { children: [_jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, {}), onClick: removeJournalTemplate, type: "danger", children: t['com.affine.template-list.delete']() })] })) : null }), children: _jsx(Button, { variant: "plain", prefix: _jsx(TemplateIcon, { className: clsx({ [styles.deletedIcon]: isDeleted }) }), className: styles.trigger, children: isDeleted ? (_jsx("del", { className: styles.deletedText, children: title })) : (title) }) }), isDeleted && _jsx("div", { className: styles.deletedTag, children: t['Deleted']() })] }));
};
//# sourceMappingURL=template-setting.js.map