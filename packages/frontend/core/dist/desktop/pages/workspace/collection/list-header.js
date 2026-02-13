import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, useConfirmModal } from '@affine/component';
import { usePageHelper } from '@affine/core/blocksuite/block-suite-page-list/utils';
import { PageListNewPageButton } from '@affine/core/components/page-list';
import { CollectionService, } from '@affine/core/modules/collection';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import track from '@affine/track';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './index.css';
export const CollectionListHeader = ({ collection, }) => {
    const t = useI18n();
    const { collectionService, workspaceService, workspaceDialogService } = useServices({
        CollectionService,
        WorkspaceService,
        WorkspaceDialogService,
    });
    const handleEdit = useCallback(() => {
        track.collection.collection.$.editCollection();
        workspaceDialogService.open('collection-editor', {
            collectionId: collection.id,
        });
    }, [collection, workspaceDialogService]);
    const workspace = workspaceService.workspace;
    const { createEdgeless, createPage } = usePageHelper(workspace.docCollection);
    const { openConfirmModal } = useConfirmModal();
    const name = useLiveData(collection.name$);
    const createAndAddDocument = useCallback((createDocumentFn) => {
        const newDoc = createDocumentFn();
        collectionService.addDocToCollection(collection.id, newDoc.id);
    }, [collection.id, collectionService]);
    const onConfirmAddDocument = useCallback((createDocumentFn) => {
        openConfirmModal({
            title: t['com.affine.collection.add-doc.confirm.title'](),
            description: t['com.affine.collection.add-doc.confirm.description'](),
            cancelText: t['Cancel'](),
            confirmText: t['Confirm'](),
            confirmButtonOptions: {
                variant: 'primary',
            },
            onConfirm: () => createAndAddDocument(createDocumentFn),
        });
    }, [openConfirmModal, t, createAndAddDocument]);
    const createPageModeDoc = useCallback(() => createPage('page'), [createPage]);
    const onCreateEdgeless = useCallback(() => onConfirmAddDocument(createEdgeless), [createEdgeless, onConfirmAddDocument]);
    const onCreatePage = useCallback(() => {
        onConfirmAddDocument(createPageModeDoc);
    }, [createPageModeDoc, onConfirmAddDocument]);
    const onCreateDoc = useCallback(() => {
        onConfirmAddDocument(createPage);
    }, [createPage, onConfirmAddDocument]);
    return (_jsxs("header", { className: styles.collectionHeader, children: [_jsxs("div", { className: styles.breadcrumb, children: [_jsx("div", { className: styles.breadcrumbItem, children: _jsx(WorkbenchLink, { to: "/collection", className: styles.breadcrumbLink, children: t['com.affine.collections.header']() }) }), _jsx("div", { className: styles.breadcrumbSeparator, children: "/" }), _jsxs("div", { className: styles.breadcrumbItem, "data-active": true, children: [_jsx(ViewLayersIcon, { className: styles.breadcrumbIcon }), name] })] }), _jsxs("div", { className: styles.headerActions, children: [_jsx(Button, { onClick: handleEdit, children: t['Edit']() }), _jsx(PageListNewPageButton, { size: "small", "data-testid": "new-page-button-trigger", onCreateDoc: onCreateDoc, onCreateEdgeless: onCreateEdgeless, onCreatePage: onCreatePage, children: _jsx("div", { className: styles.newPageButtonText, children: t['New Page']() }) })] })] }));
};
//# sourceMappingURL=list-header.js.map