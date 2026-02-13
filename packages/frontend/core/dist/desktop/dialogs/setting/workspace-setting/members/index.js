import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Tooltip } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { AffineErrorBoundary } from '@affine/core/components/affine/affine-error-boundary';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { EnableCloudPanel } from '../preference/enable-cloud';
import { CloudWorkspaceMembersPanel } from './cloud-members-panel';
import * as styles from './styles.css';
export const MembersPanel = ({ onChangeSettingState, onCloseSetting, }) => {
    const workspace = useService(WorkspaceService).workspace;
    const isTeam = useWorkspaceInfo(workspace.meta)?.isTeam;
    if (workspace.flavour === 'local') {
        return _jsx(MembersPanelLocal, { onCloseSetting: onCloseSetting });
    }
    return (_jsx(AffineErrorBoundary, { children: _jsx(CloudWorkspaceMembersPanel, { onChangeSettingState: onChangeSettingState, isTeam: isTeam }) }));
};
const MembersPanelLocal = ({ onCloseSetting, }) => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.localMembersPanel, children: [_jsx(Tooltip, { content: t['com.affine.settings.member-tooltip'](), children: _jsx("div", { className: styles.fakeWrapper, children: _jsx(SettingRow, { name: `${t['Members']()} (0)`, desc: t['Members hint'](), children: _jsx(Button, { children: t['Invite Members']() }) }) }) }), _jsx(EnableCloudPanel, { onCloseSetting: onCloseSetting })] }));
};
//# sourceMappingURL=index.js.map