import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MenuItem, MenuSeparator, MenuTrigger, Switch, } from '@affine/component';
import { SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { TemplateDocService } from '@affine/core/modules/template-doc';
import { TemplateListMenu } from '@affine/core/modules/template-doc/view/template-list-menu';
import { useI18n } from '@affine/i18n';
import { DeleteIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './template.css';
export const TemplateDocSetting = () => {
    const t = useI18n();
    const setting = useService(TemplateDocService).setting;
    const enablePageTemplate = useLiveData(setting.enablePageTemplate$);
    const pageTemplateDocId = useLiveData(setting.pageTemplateDocId$);
    const journalTemplateDocId = useLiveData(setting.journalTemplateDocId$);
    const togglePageTemplate = useCallback((enable) => {
        setting.togglePageTemplate(enable);
    }, [setting]);
    const updatePageTemplate = useCallback((id) => {
        setting.updatePageTemplateDocId(id);
    }, [setting]);
    const updateJournalTemplate = useCallback((id) => {
        setting.updateJournalTemplateDocId(id);
    }, [setting]);
    return (_jsxs(SettingWrapper, { title: t['com.affine.settings.workspace.template.title'](), children: [_jsx(SettingRow, { name: t['com.affine.settings.workspace.template.journal'](), desc: t['com.affine.settings.workspace.template.journal-desc'](), children: _jsx(TemplateSelector, { testId: "journal-template-selector", current: journalTemplateDocId, onChange: updateJournalTemplate }) }), _jsx(SettingRow, { name: t['com.affine.settings.workspace.template.page'](), desc: t['com.affine.settings.workspace.template.page-desc'](), children: _jsx(Switch, { "data-testid": "page-template-switch", checked: enablePageTemplate, onChange: togglePageTemplate }) }), enablePageTemplate ? (_jsx(SettingRow, { name: t['com.affine.settings.workspace.template.page-select'](), desc: null, children: _jsx(TemplateSelector, { testId: "page-template-selector", current: pageTemplateDocId, onChange: updatePageTemplate }) })) : null] }));
};
const TemplateSelector = ({ current, testId, onChange, }) => {
    const t = useI18n();
    const docsService = useService(DocsService);
    const docDisplayService = useService(DocDisplayMetaService);
    const doc = useLiveData(current ? docsService.list.doc$(current) : null);
    const title = useLiveData(doc ? docDisplayService.title$(doc.id) : null);
    // const isInTrash = useLiveData(doc?.trash$);
    return (_jsx(TemplateListMenu, { onSelect: onChange, contentOptions: { align: 'end' }, suffixItems: _jsxs(_Fragment, { children: [_jsx(MenuSeparator, {}), _jsx(MenuItem, { prefixIcon: _jsx(DeleteIcon, { className: styles.menuItemIcon }), onClick: () => onChange?.(), type: "danger", "data-testid": "template-doc-item-remove", children: t['com.affine.settings.workspace.template.remove']() })] }), children: _jsx(MenuTrigger, { className: styles.menuTrigger, "data-testid": testId, children: title ?? t['com.affine.settings.workspace.template.keep-empty']() }) }));
};
//# sourceMappingURL=template.js.map