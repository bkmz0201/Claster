import { jsx as _jsx } from "react/jsx-runtime";
import { Switch } from '@affine/component';
import { SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceShareSettingService } from '@affine/core/modules/share-setting';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
export const SharingPanel = () => {
    const workspace = useService(WorkspaceService).workspace;
    if (workspace.flavour === 'local') {
        return null;
    }
    return _jsx(Sharing, {});
};
export const Sharing = () => {
    const t = useI18n();
    const shareSetting = useService(WorkspaceShareSettingService).sharePreview;
    const enableUrlPreview = useLiveData(shareSetting.enableUrlPreview$);
    const loading = useLiveData(shareSetting.isLoading$);
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    const handleCheck = useAsyncCallback(async (checked) => {
        await shareSetting.setEnableUrlPreview(checked);
    }, [shareSetting]);
    if (!isOwner) {
        return null;
    }
    return (_jsx(SettingWrapper, { title: t['com.affine.settings.workspace.sharing.title'](), children: _jsx(SettingRow, { name: t['com.affine.settings.workspace.sharing.url-preview.title'](), desc: t['com.affine.settings.workspace.sharing.url-preview.description'](), children: _jsx(Switch, { checked: enableUrlPreview || false, onChange: handleCheck, disabled: loading }) }) }));
};
//# sourceMappingURL=sharing.js.map