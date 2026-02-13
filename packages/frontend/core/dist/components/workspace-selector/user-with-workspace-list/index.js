import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ScrollableContainer } from '@affine/component';
import { MenuItem } from '@affine/component/ui/menu';
import { AuthService, DefaultServerService } from '@affine/core/modules/cloud';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import {} from '@affine/core/modules/workspace';
import { ServerFeature } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { Logo1Icon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { AddWorkspace } from './add-workspace';
import * as styles from './index.css';
import { AFFiNEWorkspaceList } from './workspace-list';
export const SignInItem = () => {
    const globalDialogService = useService(GlobalDialogService);
    const t = useI18n();
    const onClickSignIn = useCallback(() => {
        track.$.navigationPanel.workspaceList.requestSignIn();
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    return (_jsx(MenuItem, { className: styles.menuItem, onClick: onClickSignIn, "data-testid": "cloud-signin-button", children: _jsxs("div", { className: styles.signInWrapper, children: [_jsx("div", { className: styles.iconContainer, children: _jsx(Logo1Icon, {}) }), _jsxs("div", { className: styles.signInTextContainer, children: [_jsx("div", { className: styles.signInTextPrimary, children: t['com.affine.workspace.cloud.auth']() }), _jsx("div", { className: styles.signInTextSecondary, children: t['com.affine.workspace.cloud.description']() })] })] }) }));
};
export const UserWithWorkspaceList = ({ onEventEnd, onClickWorkspace, onCreatedWorkspace, showEnableCloudButton, }) => {
    const globalDialogService = useService(GlobalDialogService);
    const session = useLiveData(useService(AuthService).session.session$);
    const defaultServerService = useService(DefaultServerService);
    const isAuthenticated = session.status === 'authenticated';
    const openSignInModal = useCallback(() => {
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    const onNewWorkspace = useCallback(() => {
        const enableLocalWorkspace = BUILD_CONFIG.isNative ||
            defaultServerService.server.config$.value.features.includes(ServerFeature.LocalWorkspace);
        if (!isAuthenticated && !enableLocalWorkspace) {
            return openSignInModal();
        }
        track.$.navigationPanel.workspaceList.createWorkspace();
        globalDialogService.open('create-workspace', {}, payload => {
            if (payload) {
                onCreatedWorkspace?.(payload);
            }
        });
        onEventEnd?.();
    }, [
        globalDialogService,
        defaultServerService,
        isAuthenticated,
        onCreatedWorkspace,
        onEventEnd,
        openSignInModal,
    ]);
    const onAddWorkspace = useCallback(() => {
        track.$.navigationPanel.workspaceList.createWorkspace({
            control: 'import',
        });
        globalDialogService.open('import-workspace', undefined, payload => {
            if (payload) {
                onCreatedWorkspace?.({ metadata: payload.workspace });
            }
        });
        onEventEnd?.();
    }, [globalDialogService, onCreatedWorkspace, onEventEnd]);
    return (_jsxs(_Fragment, { children: [_jsx(ScrollableContainer, { className: styles.workspaceScrollArea, viewPortClassName: styles.workspaceScrollAreaViewport, scrollBarClassName: styles.scrollbar, scrollThumbClassName: styles.scrollbarThumb, children: _jsx(AFFiNEWorkspaceList, { onEventEnd: onEventEnd, onClickWorkspace: onClickWorkspace, showEnableCloudButton: showEnableCloudButton }) }), _jsx("div", { className: styles.workspaceFooter, children: _jsx(AddWorkspace, { onAddWorkspace: onAddWorkspace, onNewWorkspace: onNewWorkspace }) })] }));
};
//# sourceMappingURL=index.js.map