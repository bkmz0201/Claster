import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, IconButton, Menu, MenuItem, MenuSub } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { DocsService } from '@affine/core/modules/doc';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { TemplateDocService } from '@affine/core/modules/template-doc';
import { TemplateListMenuContentScrollable } from '@affine/core/modules/template-doc/view/template-list-menu';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { inferOpenMode } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { ArrowDownSmallIcon, EdgelessIcon, PageIcon, PlusIcon, TemplateIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback } from 'react';
import * as styles from './index.css';
/**
 * @return a function to create a new doc, will duplicate the template doc if the page template is enabled
 */
const useNewDoc = () => {
    const workspaceService = useService(WorkspaceService);
    const templateDocService = useService(TemplateDocService);
    const docsService = useService(DocsService);
    const workbench = useService(WorkbenchService).workbench;
    const currentWorkspace = workspaceService.workspace;
    const enablePageTemplate = useLiveData(templateDocService.setting.enablePageTemplate$);
    const pageTemplateDocId = useLiveData(templateDocService.setting.pageTemplateDocId$);
    const pageHelper = usePageHelper(currentWorkspace.docCollection);
    const createPage = useAsyncCallback(async (e, mode) => {
        if (enablePageTemplate && pageTemplateDocId) {
            const docId = await docsService.duplicateFromTemplate(pageTemplateDocId);
            workbench.openDoc(docId, { at: inferOpenMode(e) });
        }
        else {
            pageHelper.createPage(mode, { at: inferOpenMode(e) });
        }
    }, [docsService, enablePageTemplate, pageHelper, pageTemplateDocId, workbench]);
    return createPage;
};
const sideBottom = { side: 'bottom' };
export function AddPageButton(props) {
    const editorSetting = useService(EditorSettingService);
    const newDocDefaultMode = useLiveData(editorSetting.editorSetting.settings$.selector(s => s.newDocDefaultMode));
    return newDocDefaultMode === 'ask' ? (_jsx(AddPageWithAsk, { ...props })) : (_jsx(AddPageWithoutAsk, { ...props }));
}
function AddPageWithAsk({ className, style }) {
    const t = useI18n();
    const createDoc = useNewDoc();
    const workbench = useService(WorkbenchService).workbench;
    const docsService = useService(DocsService);
    const createPage = useCallback((e) => {
        createDoc(e, 'page');
        track.$.navigationPanel.$.createDoc();
        track.$.sidebar.newDoc.quickStart({ with: 'page' });
    }, [createDoc]);
    const createEdgeless = useCallback((e) => {
        createDoc(e, 'edgeless');
        track.$.navigationPanel.$.createDoc();
        track.$.sidebar.newDoc.quickStart({ with: 'edgeless' });
    }, [createDoc]);
    const createDocFromTemplate = useAsyncCallback(async (templateId) => {
        const docId = await docsService.duplicateFromTemplate(templateId);
        workbench.openDoc(docId);
        track.$.sidebar.newDoc.quickStart({ with: 'template' });
    }, [docsService, workbench]);
    return (_jsx(Menu, { items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { prefixIcon: _jsx(PageIcon, {}), onClick: createPage, onAuxClick: createPage, children: t['Page']() }), _jsx(MenuItem, { prefixIcon: _jsx(EdgelessIcon, {}), onClick: createEdgeless, onAuxClick: createEdgeless, children: t['Edgeless']() }), _jsx(MenuSub, { triggerOptions: {
                        prefixIcon: _jsx(TemplateIcon, {}),
                    }, subContentOptions: {
                        sideOffset: 16,
                        className: styles.templateMenu,
                    }, items: _jsx(TemplateListMenuContentScrollable, { onSelect: createDocFromTemplate }), children: t['Template']() })] }), children: _jsx(Button, { tooltip: t['New Page'](), tooltipOptions: sideBottom, "data-testid": "sidebar-new-page-with-ask-button", className: clsx([styles.withAskRoot, className]), style: style, children: _jsxs("div", { className: styles.withAskContent, children: [_jsx(PlusIcon, {}), _jsx(ArrowDownSmallIcon, {})] }) }) }));
}
function AddPageWithoutAsk({ className, style }) {
    const createDoc = useNewDoc();
    const onClickNewPage = useCallback((e) => {
        createDoc(e);
        track.$.navigationPanel.$.createDoc();
    }, [createDoc]);
    const t = useI18n();
    return (_jsx(IconButton, { tooltip: t['New Page'](), tooltipOptions: sideBottom, "data-testid": "sidebar-new-page-button", style: style, className: clsx([styles.root, className]), size: 16, onClick: onClickNewPage, onAuxClick: onClickNewPage, children: _jsx(PlusIcon, {}) }));
}
//# sourceMappingURL=index.js.map