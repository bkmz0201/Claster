import { jsx as _jsx } from "react/jsx-runtime";
import { Switch } from '@affine/component';
import { SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { ServerService } from '@affine/core/modules/cloud';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceShareSettingService } from '@affine/core/modules/share-setting';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
export const AiSetting = () => {
    const t = useI18n();
    const shareSetting = useService(WorkspaceShareSettingService).sharePreview;
    const serverService = useService(ServerService);
    const serverEnableAi = useLiveData(serverService.server.features$.map(f => f?.copilot));
    const workspaceEnableAi = useLiveData(shareSetting.enableAi$);
    const loading = useLiveData(shareSetting.isLoading$);
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    const toggleAi = useAsyncCallback(async (checked) => {
        await shareSetting.setEnableAi(checked);
    }, [shareSetting]);
    if (!isOwner || !serverEnableAi) {
        return null;
    }
    return (_jsx(SettingWrapper, { title: t['com.affine.settings.workspace.affine-ai.title'](), children: _jsx(SettingRow, { name: t['com.affine.settings.workspace.affine-ai.label'](), desc: t['com.affine.settings.workspace.affine-ai.description'](), children: _jsx(Switch, { checked: !!workspaceEnableAi, onChange: toggleAi, disabled: loading }) }) }));
};
//# sourceMappingURL=ai.js.map