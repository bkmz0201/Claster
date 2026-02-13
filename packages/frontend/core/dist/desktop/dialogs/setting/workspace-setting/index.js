import { jsx as _jsx } from "react/jsx-runtime";
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { ServerService } from '@affine/core/modules/cloud';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { EmbeddingSettings } from '@affine/core/modules/workspace-indexer-embedding';
import { ServerDeploymentType } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { AiEmbeddingIcon, CollaborationIcon, IntegrationsIcon, PaymentIcon, PropertyIcon, SaveIcon, SettingsIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
import { WorkspaceSettingBilling } from './billing';
import { IntegrationSetting } from './integration';
import { WorkspaceSettingLicense } from './license';
import { MembersPanel } from './members';
import { WorkspaceSettingDetail } from './preference';
import { WorkspaceSettingProperties } from './properties';
import { WorkspaceSettingStorage } from './storage';
export const WorkspaceSetting = ({ activeTab, onCloseSetting, onChangeSettingState, }) => {
    switch (activeTab) {
        case 'workspace:preference':
            return _jsx(WorkspaceSettingDetail, { onCloseSetting: onCloseSetting });
        case 'workspace:properties':
            return _jsx(WorkspaceSettingProperties, {});
        case 'workspace:members':
            return (_jsx(MembersPanel, { onCloseSetting: onCloseSetting, onChangeSettingState: onChangeSettingState }));
        case 'workspace:billing':
            return _jsx(WorkspaceSettingBilling, {});
        case 'workspace:storage':
            return _jsx(WorkspaceSettingStorage, { onCloseSetting: onCloseSetting });
        case 'workspace:license':
            return _jsx(WorkspaceSettingLicense, { onCloseSetting: onCloseSetting });
        case 'workspace:integrations':
            return _jsx(IntegrationSetting, {});
        case 'workspace:embedding':
            return _jsx(EmbeddingSettings, {});
        default:
            return null;
    }
};
export const useWorkspaceSettingList = () => {
    const workspaceService = useService(WorkspaceService);
    const information = useWorkspaceInfo(workspaceService.workspace);
    const serverService = useService(ServerService);
    const isSelfhosted = useLiveData(serverService.server.config$.selector(c => c.type === ServerDeploymentType.Selfhosted));
    const t = useI18n();
    const showBilling = !isSelfhosted && information?.isTeam && information?.isOwner;
    const showLicense = information?.isOwner && isSelfhosted;
    const items = useMemo(() => {
        return [
            {
                key: 'workspace:preference',
                title: t['com.affine.settings.workspace.preferences'](),
                icon: _jsx(SettingsIcon, {}),
                testId: 'workspace-setting:preference',
            },
            {
                key: 'workspace:properties',
                title: t['com.affine.settings.workspace.properties'](),
                icon: _jsx(PropertyIcon, {}),
                testId: 'workspace-setting:properties',
            },
            {
                key: 'workspace:members',
                title: t['Members'](),
                icon: _jsx(CollaborationIcon, {}),
                testId: 'workspace-setting:members',
            },
            {
                key: 'workspace:integrations',
                title: t['com.affine.integration.integrations'](),
                icon: _jsx(IntegrationsIcon, {}),
                testId: 'workspace-setting:integrations',
            },
            {
                key: 'workspace:storage',
                title: t['Storage'](),
                icon: _jsx(SaveIcon, {}),
                testId: 'workspace-setting:storage',
            },
            {
                key: 'workspace:embedding',
                title: t['com.affine.settings.workspace.indexer-embedding.embedding.title'](),
                icon: _jsx(AiEmbeddingIcon, {}),
                testId: 'workspace-setting:embedding',
            },
            showBilling && {
                key: 'workspace:billing',
                title: t['com.affine.settings.workspace.billing'](),
                icon: _jsx(PaymentIcon, {}),
                testId: 'workspace-setting:billing',
            },
            showLicense && {
                key: 'workspace:license',
                title: t['com.affine.settings.workspace.license'](),
                icon: _jsx(PaymentIcon, {}),
                testId: 'workspace-setting:license',
            },
        ].filter((item) => !!item);
    }, [showBilling, showLicense, t]);
    return items;
};
//# sourceMappingURL=index.js.map