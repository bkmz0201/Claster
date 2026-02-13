import { jsx as _jsx } from "react/jsx-runtime";
import { MenuItem } from '@affine/core/modules/app-sidebar/views';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { CollaborationIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
export const InviteMembersButton = () => {
    const workspace = useService(WorkspaceService).workspace;
    const isLocal = workspace.flavour === 'local';
    const dialogService = useService(WorkspaceDialogService);
    const onOpenInviteMembersModal = useCallback(() => {
        dialogService.open('setting', {
            activeTab: `workspace:members`,
        });
    }, [dialogService]);
    const t = useI18n();
    if (isLocal) {
        return null;
    }
    return (_jsx(MenuItem, { "data-testid": "slider-bar-invite-members-button", icon: _jsx(CollaborationIcon, {}), onClick: onOpenInviteMembersModal, children: t['Invite Members']() }));
};
//# sourceMappingURL=invite-members-button.js.map