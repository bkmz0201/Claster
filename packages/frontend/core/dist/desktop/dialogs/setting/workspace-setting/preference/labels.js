import { jsx as _jsx } from "react/jsx-runtime";
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useEffect, useMemo } from 'react';
import * as style from './style.css';
const Label = ({ value, background }) => {
    return (_jsx("div", { children: _jsx("div", { className: style.workspaceLabel, style: { background: background }, children: value }) }));
};
const getConditions = (isOwner, flavour, isTeam) => {
    return [
        { condition: !isOwner, label: 'joinedWorkspace' },
        { condition: flavour === 'local', label: 'local' },
        {
            condition: flavour === 'affine-cloud',
            label: 'syncCloud',
        },
        {
            condition: !!isTeam,
            label: 'teamWorkspace',
        },
        {
            condition: flavour !== 'affine-cloud' && flavour !== 'local',
            label: 'selfHosted',
        },
    ];
};
const getLabelMap = (t) => ({
    local: {
        value: t['com.affine.settings.workspace.state.local'](),
        background: cssVarV2('chip/label/orange'),
    },
    syncCloud: {
        value: t['com.affine.settings.workspace.state.sync-affine-cloud'](),
        background: cssVarV2('chip/label/blue'),
    },
    selfHosted: {
        value: t['com.affine.settings.workspace.state.self-hosted'](),
        background: cssVarV2('chip/label/purple'),
    },
    joinedWorkspace: {
        value: t['com.affine.settings.workspace.state.joined'](),
        background: cssVarV2('chip/label/yellow'),
    },
    availableOffline: {
        value: t['com.affine.settings.workspace.state.available-offline'](),
        background: cssVarV2('chip/label/green'),
    },
    publishedToWeb: {
        value: t['com.affine.settings.workspace.state.published'](),
        background: cssVarV2('chip/label/blue'),
    },
    teamWorkspace: {
        value: t['com.affine.settings.workspace.state.team'](),
        background: cssVarV2('chip/label/purple'),
    },
});
export const LabelsPanel = () => {
    const workspace = useService(WorkspaceService).workspace;
    const permissionService = useService(WorkspacePermissionService);
    const isOwner = useLiveData(permissionService.permission.isOwner$);
    const isTeam = useLiveData(permissionService.permission.isTeam$);
    const t = useI18n();
    useEffect(() => {
        permissionService.permission.revalidate();
    }, [permissionService]);
    const labelMap = useMemo(() => getLabelMap(t), [t]);
    const labelConditions = useMemo(() => getConditions(isOwner, workspace.flavour, isTeam), [isOwner, isTeam, workspace.flavour]);
    return (_jsx("div", { className: style.labelWrapper, children: labelConditions.map(({ condition, label }) => condition && (_jsx(Label, { value: labelMap[label].value, background: labelMap[label].background }, label))) }));
};
//# sourceMappingURL=labels.js.map