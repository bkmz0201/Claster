import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {} from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { ExplorerDisplayMenuButton } from '@affine/core/components/explorer/display-menu';
import { ViewToggle } from '@affine/core/components/explorer/display-menu/view-toggle';
import { ExplorerNavigation } from '@affine/core/components/explorer/header/navigation';
import { PageListNewPageButton } from '@affine/core/components/page-list/docs/page-list-new-page-button';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { inferOpenMode } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './all-page-header.css';
const menuProps = {
    contentOptions: {
        side: 'bottom',
        align: 'end',
        alignOffset: 0,
        sideOffset: 8,
    },
};
export const AllDocsHeader = ({ displayPreference, onDisplayPreferenceChange, view, onViewChange, }) => {
    const t = useI18n();
    const workspaceService = useService(WorkspaceService);
    const workspaceDialogService = useService(WorkspaceDialogService);
    const workbenchService = useService(WorkbenchService);
    const workbench = workbenchService.workbench;
    const { createEdgeless, createPage } = usePageHelper(workspaceService.workspace.docCollection);
    const handleOpenDocs = useCallback((result) => {
        const { docIds, entryId, isWorkspaceFile } = result;
        // If the imported file is a workspace file, open the entry page.
        if (isWorkspaceFile && entryId) {
            workbench.openDoc(entryId);
        }
        else if (!docIds.length) {
            return;
        }
        // Open all the docs when there are multiple docs imported.
        if (docIds.length > 1) {
            workbench.openAll();
        }
        else {
            // Otherwise, open the only doc.
            workbench.openDoc(docIds[0]);
        }
    }, [workbench]);
    const onImportFile = useCallback(() => {
        track.$.header.importModal.open();
        workspaceDialogService.open('import', undefined, payload => {
            if (!payload) {
                return;
            }
            handleOpenDocs(payload);
        });
    }, [workspaceDialogService, handleOpenDocs]);
    return (_jsxs("div", { className: styles.header, children: [_jsx(ExplorerNavigation, { active: "docs" }), _jsxs("div", { className: styles.actions, children: [_jsx(ViewToggle, { view: view, onViewChange: onViewChange }), _jsx(ExplorerDisplayMenuButton, { menuProps: menuProps, displayPreference: displayPreference, onDisplayPreferenceChange: onDisplayPreferenceChange }), _jsx(PageListNewPageButton, { size: "small", onCreateEdgeless: e => createEdgeless({ at: inferOpenMode(e) }), onCreatePage: e => createPage('page', { at: inferOpenMode(e) }), onCreateDoc: e => createPage(undefined, { at: inferOpenMode(e) }), onImportFile: onImportFile, "data-testid": "new-page-button-trigger", children: _jsx("span", { className: styles.newPageButtonLabel, children: t['New Page']() }) })] })] }));
};
//# sourceMappingURL=all-page-header.js.map