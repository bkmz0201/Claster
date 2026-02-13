import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, notify, Skeleton, Tooltip } from '@affine/component';
import { Loading } from '@affine/component/ui/loading';
import { useSystemOnline } from '@affine/core/components/hooks/use-system-online';
import { useWorkspace } from '@affine/core/components/hooks/use-workspace';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspacesService, } from '@affine/core/modules/workspace';
import { UNTITLED_WORKSPACE_NAME } from '@affine/env/constant';
import { useI18n } from '@affine/i18n';
import { ArrowDownSmallIcon, CloudWorkspaceIcon, CollaborationIcon, DoneIcon, InformationFillDuotoneIcon, LocalWorkspaceIcon, NoNetworkIcon, SettingsIcon, TeamWorkspaceIcon, UnsyncIcon, } from '@blocksuite/icons/rc';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useAsyncCallback } from '../../hooks/affine-async-hooks';
import { useCatchEventCallback } from '../../hooks/use-catch-event-hook';
import { useNavigateHelper } from '../../hooks/use-navigate-helper';
import { WorkspaceAvatar } from '../../workspace-avatar';
import * as styles from './styles.css';
export { PureWorkspaceCard } from './pure-workspace-card';
const CloudWorkspaceStatus = () => {
    return (_jsxs(_Fragment, { children: [_jsx(CloudWorkspaceIcon, {}), "Cloud"] }));
};
const SyncingWorkspaceStatus = ({ progress }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Loading, { progress: progress, speed: 0 }), "Syncing..."] }));
};
const UnSyncWorkspaceStatus = () => {
    return (_jsxs(_Fragment, { children: [_jsx(UnsyncIcon, {}), "Wait for upload"] }));
};
const LocalWorkspaceStatus = () => {
    return (_jsxs(_Fragment, { children: [!BUILD_CONFIG.isElectron ? (_jsx(InformationFillDuotoneIcon, { style: { color: cssVar('errorColor') } })) : (_jsx(LocalWorkspaceIcon, {})), "Local"] }));
};
const OfflineStatus = () => {
    return (_jsxs(_Fragment, { children: [_jsx(NoNetworkIcon, {}), "Offline"] }));
};
const useSyncEngineSyncProgress = (meta) => {
    const isOnline = useSystemOnline();
    const workspace = useWorkspace(meta);
    const engineState = useLiveData(useMemo(() => {
        return workspace
            ? LiveData.from(workspace.engine.doc.state$, null)
            : null;
    }, [workspace]));
    if (!engineState || !workspace) {
        return null;
    }
    const progress = (engineState.total - engineState.syncing) / engineState.total;
    const syncing = engineState.syncing > 0 || engineState.syncRetrying;
    let content;
    // TODO(@eyhn): add i18n
    if (workspace.flavour === 'local') {
        if (!BUILD_CONFIG.isElectron) {
            content = 'This is a local demo workspace.';
        }
        else {
            content = 'Saved locally';
        }
    }
    else if (!isOnline) {
        content = 'Disconnected, please check your network connection';
    }
    else if (engineState.syncRetrying && engineState.syncErrorMessage) {
        content = `${engineState.syncErrorMessage}, reconnecting.`;
    }
    else if (engineState.syncRetrying) {
        content = 'Sync disconnected due to unexpected issues, reconnecting.';
    }
    else if (syncing) {
        content =
            `Syncing with AFFiNE Cloud` +
                (progress ? ` (${Math.floor(progress * 100)}%)` : '');
    }
    else {
        content = 'Synced with AFFiNE Cloud';
    }
    const CloudWorkspaceSyncStatus = () => {
        if (syncing) {
            return SyncingWorkspaceStatus({
                progress: progress ? Math.max(progress, 0.2) : undefined,
            });
        }
        else if (engineState.syncRetrying) {
            return UnSyncWorkspaceStatus();
        }
        else {
            return CloudWorkspaceStatus();
        }
    };
    return {
        message: content,
        icon: workspace.flavour !== 'local' ? (!isOnline ? (_jsx(OfflineStatus, {})) : (_jsx(CloudWorkspaceSyncStatus, {}))) : (_jsx(LocalWorkspaceStatus, {})),
        progress,
        active: workspace.flavour !== 'local' &&
            ((syncing && progress !== undefined) || engineState.syncRetrying), // active if syncing or retrying,
    };
};
const usePauseAnimation = (timeToResume = 5000) => {
    const [paused, setPaused] = useState(false);
    const resume = useCallback(() => {
        setPaused(false);
    }, []);
    const pause = useCallback(() => {
        setPaused(true);
        if (timeToResume > 0) {
            setTimeout(resume, timeToResume);
        }
    }, [resume, timeToResume]);
    return { paused, pause };
};
const WorkspaceSyncInfo = ({ workspaceMetadata, workspaceProfile, dense, }) => {
    const syncStatus = useSyncEngineSyncProgress(workspaceMetadata);
    const isCloud = workspaceMetadata.flavour !== 'local';
    const { paused, pause } = usePauseAnimation();
    // to make sure that animation will play first time
    const [delayActive, setDelayActive] = useState(false);
    useEffect(() => {
        if (paused || !syncStatus) {
            return;
        }
        const delayOpen = 0;
        const delayClose = 200;
        let timer;
        if (syncStatus.active) {
            timer = setTimeout(() => {
                setDelayActive(syncStatus.active);
            }, delayOpen);
        }
        else {
            timer = setTimeout(() => {
                setDelayActive(syncStatus.active);
                pause();
            }, delayClose);
        }
        return () => clearTimeout(timer);
    }, [pause, paused, syncStatus]);
    if (!workspaceProfile) {
        return null;
    }
    return (_jsx("div", { className: styles.workspaceInfoSlider, "data-active": delayActive, "data-dense": dense, children: _jsxs("div", { className: styles.workspaceInfoSlide, children: [_jsxs("div", { className: styles.workspaceInfo, "data-type": "normal", children: [_jsx("div", { className: styles.workspaceName, "data-testid": "workspace-name", children: workspaceProfile.name }), !dense ? (_jsx("div", { className: styles.workspaceStatus, children: isCloud ? _jsx(CloudWorkspaceStatus, {}) : _jsx(LocalWorkspaceStatus, {}) })) : null] }), syncStatus && (_jsx("div", { className: styles.workspaceInfo, "data-type": "events", children: _jsx(Tooltip, { content: syncStatus.message, options: { className: styles.workspaceInfoTooltip }, children: _jsx("div", { className: styles.workspaceActiveStatus, children: _jsx(SyncingWorkspaceStatus, { progress: syncStatus.progress }) }) }) }))] }) }));
};
export const WorkspaceCard = forwardRef(({ workspaceMetadata, showSyncStatus, showArrowDownIcon, onClickOpenSettings, onClickEnableCloud, className, infoClassName, disable, hideCollaborationIcon, hideTeamWorkspaceIcon, active, dense, avatarSize = dense ? 20 : 32, ...props }, ref) => {
    const t = useI18n();
    const information = useWorkspaceInfo(workspaceMetadata);
    const workspacesService = useService(WorkspacesService);
    const navigate = useNavigateHelper();
    const name = information?.name ?? UNTITLED_WORKSPACE_NAME;
    const onEnableCloud = useCatchEventCallback(() => {
        onClickEnableCloud?.(workspaceMetadata);
    }, [onClickEnableCloud, workspaceMetadata]);
    const onRemoveWorkspace = useAsyncCallback(async () => {
        await workspacesService
            .deleteWorkspace(workspaceMetadata)
            .then(() => {
            notify.success({ title: t['Successfully removed workspace']() });
            navigate.jumpToIndex();
        })
            .catch(() => {
            notify.error({ title: t['Failed to remove workspace']() });
        });
    }, [workspacesService, workspaceMetadata, t, navigate]);
    const onOpenSettings = useCatchEventCallback(() => {
        onClickOpenSettings?.(workspaceMetadata);
    }, [onClickOpenSettings, workspaceMetadata]);
    return (_jsxs("div", { className: clsx(styles.container, disable ? styles.disable : null, className), role: "button", tabIndex: 0, "data-testid": "workspace-card", ref: ref, ...props, children: [_jsxs("div", { className: clsx(styles.infoContainer, infoClassName), children: [information ? (_jsx(WorkspaceAvatar, { className: styles.avatar, meta: workspaceMetadata, rounded: 3, "data-testid": "workspace-avatar", size: avatarSize, name: name, colorfulFallback: true })) : (_jsx(Skeleton, { width: avatarSize, height: avatarSize })), _jsx("div", { className: styles.workspaceTitleContainer, children: information ? (showSyncStatus ? (_jsx(WorkspaceSyncInfo, { workspaceProfile: information, workspaceMetadata: workspaceMetadata, dense: dense })) : (_jsx("span", { className: styles.workspaceName, children: information.name }))) : (_jsx(Skeleton, { width: 100 })) }), information?.isEmpty && information.isOwner ? (_jsx(Button, { onClick: onRemoveWorkspace, children: "Remove" })) : null, _jsxs("div", { className: styles.showOnCardHover, children: [onClickEnableCloud && workspaceMetadata.flavour === 'local' ? (_jsx(Button, { className: styles.enableCloudButton, onClick: onEnableCloud, children: "Enable Cloud" })) : null, onClickOpenSettings && (_jsx("div", { className: styles.settingButton, onClick: onOpenSettings, children: _jsx(SettingsIcon, { width: 16, height: 16 }) }))] })] }), _jsxs("div", { className: styles.suffixIcons, children: [hideCollaborationIcon || information?.isOwner ? null : (_jsx(Tooltip, { content: t['com.affine.settings.workspace.state.joined'](), children: _jsx(CollaborationIcon, { className: styles.collaborationIcon }) })), hideTeamWorkspaceIcon || !information?.isTeam ? null : (_jsx(Tooltip, { content: t['com.affine.settings.workspace.state.team'](), children: _jsx(TeamWorkspaceIcon, { className: styles.collaborationIcon }) })), active && (_jsx("div", { className: styles.activeContainer, children: _jsx(DoneIcon, { className: styles.activeIcon }) })), showArrowDownIcon && _jsx(ArrowDownSmallIcon, {})] })] }));
});
WorkspaceCard.displayName = 'WorkspaceCard';
//# sourceMappingURL=index.js.map