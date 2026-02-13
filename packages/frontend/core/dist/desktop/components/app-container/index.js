import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppSettingHelper } from '@affine/core/components/hooks/affine/use-app-setting-helper';
import { RootAppSidebar } from '@affine/core/components/root-app-sidebar';
import { AppSidebarService } from '@affine/core/modules/app-sidebar';
import { AppSidebarFallback, OpenInAppCard, SidebarSwitch, } from '@affine/core/modules/app-sidebar/views';
import { AppTabsHeader } from '@affine/core/modules/app-tabs-header';
import { NavigationButtons } from '@affine/core/modules/navigation';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, } from 'react';
import * as styles from './styles.css';
export const AppContainer = ({ children, className, fallback = false, ...rest }) => {
    const { appSettings } = useAppSettingHelper();
    const noisyBackground = BUILD_CONFIG.isElectron && appSettings.enableNoisyBackground;
    const blurBackground = BUILD_CONFIG.isElectron &&
        environment.isMacOs &&
        appSettings.enableBlurBackground;
    return (_jsx("div", { ...rest, className: clsx(styles.appStyle, className, {
            'noisy-background': noisyBackground,
            'blur-background': blurBackground,
        }), "data-noise-background": noisyBackground, "data-translucent": blurBackground, children: _jsx(LayoutComponent, { fallback: fallback, children: children }) }));
};
const DesktopLayout = ({ children, fallback = false, }) => {
    const workspaceService = useServiceOptional(WorkspaceService);
    const isInWorkspace = !!workspaceService;
    return (_jsxs("div", { className: styles.desktopAppViewContainer, children: [_jsx("div", { className: styles.desktopTabsHeader, children: _jsx(AppTabsHeader, { left: _jsxs(_Fragment, { children: [isInWorkspace && _jsx(SidebarSwitch, { show: true }), isInWorkspace && _jsx(NavigationButtons, {})] }) }) }), _jsxs("div", { className: styles.desktopAppViewMain, children: [fallback ? (_jsx(AppSidebarFallback, {})) : (isInWorkspace && _jsx(RootAppSidebar, {})), _jsx(MainContainer, { children: children })] })] }));
};
const BrowserLayout = ({ children, fallback = false, }) => {
    const workspaceService = useServiceOptional(WorkspaceService);
    const isInWorkspace = !!workspaceService;
    return (_jsxs("div", { className: styles.browserAppViewContainer, children: [_jsx(OpenInAppCard, {}), fallback ? _jsx(AppSidebarFallback, {}) : isInWorkspace && _jsx(RootAppSidebar, {}), _jsx(MainContainer, { children: children })] }));
};
const LayoutComponent = BUILD_CONFIG.isElectron ? DesktopLayout : BrowserLayout;
const MainContainer = forwardRef(function MainContainer({ className, children, ...props }, ref) {
    const workspaceService = useServiceOptional(WorkspaceService);
    const isInWorkspace = !!workspaceService;
    const { appSettings } = useAppSettingHelper();
    const appSidebarService = useService(AppSidebarService).sidebar;
    const open = useLiveData(appSidebarService.open$);
    return (_jsx("div", { ...props, className: clsx(styles.mainContainerStyle, className), "data-is-desktop": BUILD_CONFIG.isElectron, "data-transparent": false, "data-client-border": appSettings.clientBorder, "data-side-bar-open": open && isInWorkspace, "data-testid": "main-container", ref: ref, children: children }));
});
MainContainer.displayName = 'MainContainer';
//# sourceMappingURL=index.js.map