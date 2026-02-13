import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { AllDocsIcon, FilterIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { ActionButton } from './action-button';
import collectionDetailDark from './assets/collection-detail.dark.png';
import collectionDetailLight from './assets/collection-detail.light.png';
import { EmptyLayout } from './layout';
import { actionGroup } from './style.css';
export const EmptyCollectionDetail = ({ collection, ...props }) => {
    const t = useI18n();
    return (_jsx(EmptyLayout, { illustrationLight: collectionDetailLight, illustrationDark: collectionDetailDark, title: t['com.affine.empty.collection-detail.title'](), description: t['com.affine.empty.collection-detail.description'](), action: BUILD_CONFIG.isMobileEdition ? null : (_jsx(Actions, { collection: collection })), ...props }));
};
const Actions = ({ collection }) => {
    const t = useI18n();
    const workspaceDialogService = useService(WorkspaceDialogService);
    const openAddDocs = useCallback(() => {
        workspaceDialogService.open('collection-editor', {
            collectionId: collection.id,
            mode: 'page',
        });
    }, [collection, workspaceDialogService]);
    const openAddRules = useCallback(() => {
        workspaceDialogService.open('collection-editor', {
            collectionId: collection.id,
            mode: 'rule',
        });
    }, [collection, workspaceDialogService]);
    return (_jsxs("div", { className: actionGroup, children: [_jsx(ActionButton, { prefix: _jsx(AllDocsIcon, {}), onClick: openAddDocs, children: t['com.affine.empty.collection-detail.action.add-doc']() }), _jsx(ActionButton, { prefix: _jsx(FilterIcon, {}), onClick: openAddRules, children: t['com.affine.empty.collection-detail.action.add-rule']() })] }));
};
//# sourceMappingURL=collection-detail.js.map