import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SettingHeader, SettingWrapper, } from '@affine/component/setting-components';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { EnableCloudPanel } from '../preference/enable-cloud';
import { BlobManagementPanel } from './blob-management';
import { DesktopExportPanel } from './export';
import { WorkspaceQuotaPanel } from './workspace-quota';
export const WorkspaceSettingStorage = ({ onCloseSetting, }) => {
    const t = useI18n();
    const workspace = useService(WorkspaceService).workspace;
    const workspacePermissionService = useService(WorkspacePermissionService).permission;
    const isTeam = useLiveData(workspacePermissionService.isTeam$);
    const isOwner = useLiveData(workspacePermissionService.isOwner$);
    const canExport = !isTeam || isOwner;
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['Storage'](), subtitle: t['com.affine.settings.workspace.storage.subtitle']() }), workspace.flavour === 'local' ? (_jsxs(_Fragment, { children: [_jsx(EnableCloudPanel, { onCloseSetting: onCloseSetting }), ' ', BUILD_CONFIG.isElectron && (_jsx(SettingWrapper, { children: _jsx(DesktopExportPanel, { workspace: workspace }) }))] })) : (_jsxs(_Fragment, { children: [isTeam ? (_jsx(SettingWrapper, { children: _jsx(WorkspaceQuotaPanel, {}) })) : null, BUILD_CONFIG.isElectron && canExport && (_jsx(SettingWrapper, { children: _jsx(DesktopExportPanel, { workspace: workspace }) })), _jsx(SettingWrapper, { children: _jsx(BlobManagementPanel, {}) })] }))] }));
};
//# sourceMappingURL=index.js.map