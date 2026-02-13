import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { InformationIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
export const InfoButton = ({ docId }) => {
    const workspaceDialogService = useService(WorkspaceDialogService);
    const t = useI18n();
    const onOpenInfoModal = useCallback(() => {
        track.$.header.actions.openDocInfo();
        workspaceDialogService.open('doc-info', { docId });
    }, [docId, workspaceDialogService]);
    return (_jsx(IconButton, { size: "20", tooltip: t['com.affine.page-properties.page-info.view'](), "data-testid": "header-info-button", onClick: onOpenInfoModal, children: _jsx(InformationIcon, {}) }));
};
//# sourceMappingURL=index.js.map