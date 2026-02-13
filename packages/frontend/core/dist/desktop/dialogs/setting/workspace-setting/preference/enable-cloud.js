import { jsx as _jsx } from "react/jsx-runtime";
import { SettingRow } from '@affine/component/setting-components';
import { Button } from '@affine/component/ui/button';
import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import { WorkspaceService, } from '@affine/core/modules/workspace';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
export const EnableCloudPanel = ({ onCloseSetting, }) => {
    const t = useI18n();
    const confirmEnableCloud = useEnableCloud();
    const workspace = useService(WorkspaceService).workspace;
    const name = useLiveData(workspace.name$);
    const flavour = workspace.flavour;
    const confirmEnableCloudAndClose = useCallback(() => {
        if (!workspace)
            return;
        confirmEnableCloud(workspace, {
            onSuccess: () => {
                onCloseSetting?.();
            },
        });
    }, [confirmEnableCloud, onCloseSetting, workspace]);
    if (flavour !== 'local') {
        return null;
    }
    return (_jsx(SettingRow, { name: t['Workspace saved locally']({
            name: name ?? UNTITLED_WORKSPACE_NAME,
        }), desc: t['Enable cloud hint'](), spreadCol: false, style: {
            padding: '10px',
            background: 'var(--affine-background-secondary-color)',
            marginTop: '24px',
        }, children: _jsx(Button, { "data-testid": "publish-enable-affine-cloud-button", variant: "primary", onClick: confirmEnableCloudAndClose, style: { marginTop: '12px' }, children: t['Enable AFFiNE Cloud']() }) }));
};
//# sourceMappingURL=enable-cloud.js.map