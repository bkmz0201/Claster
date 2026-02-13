import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceServerService } from '@affine/core/modules/cloud';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { useI18n } from '@affine/i18n';
import { ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import { DeleteLeaveWorkspace } from './delete-leave-workspace';
import { CurriculumUploadPanel } from './curriculum-upload';
import { EnableCloudPanel } from './enable-cloud';
import { LabelsPanel } from './labels';
import { ProfilePanel } from './profile';
import { SharingPanel } from './sharing';
import { TemplateDocSetting } from './template';
export const WorkspaceSettingDetail = ({ onCloseSetting, }) => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const server = workspace?.scope.get(WorkspaceServerService).server;
    const permissionService = useService(WorkspacePermissionService);
    const workspaceInfo = useWorkspaceInfo(workspace);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    console.log('WorkspaceSettingDetail', { isOwner, workspaceFlavour: workspace?.flavour, server: !!server });
    console.log('isOwner value:', isOwner);
    useEffect(() => {
        if (isOwner === null) {
            permissionService.permission.revalidate();
        }
    }, [isOwner, permissionService]);
    const handleResetSyncStatus = useCallback(() => {
        workspace?.engine.doc
            .resetSync()
            .then(() => {
            onCloseSetting();
        })
            .catch(err => {
            console.error(err);
        });
    }, [onCloseSetting, workspace]);
    return (_jsxs(FrameworkScope, { scope: server?.scope, children: [_jsx(SettingHeader, { title: t[`Workspace Settings with name`]({
                    name: workspaceInfo?.name ?? UNTITLED_WORKSPACE_NAME,
                }), subtitle: t['com.affine.settings.workspace.description']() }), _jsx(SettingWrapper, { title: t['Info'](), children: _jsxs(SettingRow, { name: t['Workspace Profile'](), desc: t['com.affine.settings.workspace.not-owner'](), spreadCol: false, children: [_jsx(ProfilePanel, {}), _jsx(LabelsPanel, {}), workspace.flavour === 'local' && (_jsx(EnableCloudPanel, { onCloseSetting: onCloseSetting }))] }) }), _jsx(TemplateDocSetting, {}), true && (_jsx(SettingWrapper, { title: t['com.affine.settings.workspace.curriculum'](), children: _jsx(SettingRow, { name: t['com.affine.settings.workspace.upload-curriculum'](), desc: t['com.affine.settings.workspace.upload-curriculum.description'](), spreadCol: false, children: _jsx(CurriculumUploadPanel, {}) }) })), _jsx(SharingPanel, {}), _jsxs(SettingWrapper, { children: [_jsx(DeleteLeaveWorkspace, { onCloseSetting: onCloseSetting }), _jsx(SettingRow, { name: _jsx("span", { style: { color: 'var(--affine-text-secondary-color)' }, children: t['com.affine.resetSyncStatus.button']() }), desc: t['com.affine.resetSyncStatus.description'](), style: { cursor: 'pointer' }, onClick: handleResetSyncStatus, "data-testid": "reset-sync-status", children: _jsx(ArrowRightSmallIcon, {}) })] })] }));
};
//# sourceMappingURL=index.js.map