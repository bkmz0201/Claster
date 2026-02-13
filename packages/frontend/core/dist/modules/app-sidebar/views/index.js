import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from '@affine/component';
import { ResizePanel } from '@affine/component/resize-panel';
import { useAppSettingHelper } from '@affine/core/components/hooks/affine/use-app-setting-helper';
import { NavigateContext } from '@affine/core/components/hooks/use-navigate-helper';
import { WorkspaceNavigator } from '@affine/core/components/workspace-selector';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { WorkbenchService } from '../../workbench';
import { allowedSplitViewEntityTypes } from '../../workbench/view/split-view/types';
import { WorkspaceService } from '../../workspace';
import { AppSidebarService } from '../services/app-sidebar';
import * as styles from './fallback.css';
import { hoverNavWrapperStyle, navBodyStyle, navHeaderStyle, navStyle, navWrapperStyle, resizeHandleShortcutStyle, sidebarFloatMaskStyle, } from './index.css';
import { SidebarHeader } from './sidebar-header';
const MAX_WIDTH = 480;
const MIN_WIDTH = 248;
const isMacosDesktop = BUILD_CONFIG.isElectron && environment.isMacOs;
export function AppSidebar({ children }) {
    const { appSettings } = useAppSettingHelper();
    const clientBorder = appSettings.clientBorder;
    const appSidebarService = useService(AppSidebarService).sidebar;
    const workbenchService = useService(WorkbenchService).workbench;
    const open = useLiveData(appSidebarService.open$);
    const width = useLiveData(appSidebarService.width$);
    const smallScreenMode = useLiveData(appSidebarService.smallScreenMode$);
    const hovering = useLiveData(appSidebarService.hovering$) && open !== true;
    const resizing = useLiveData(appSidebarService.resizing$);
    const sidebarState = smallScreenMode
        ? open
            ? 'floating-with-mask'
            : 'close'
        : open
            ? 'open'
            : hovering
                ? 'floating'
                : 'close';
    const hasRightBorder = !BUILD_CONFIG.isElectron && !clientBorder;
    const handleOpenChange = useCallback((open) => {
        appSidebarService.setOpen(open);
    }, [appSidebarService]);
    const handleResizing = useCallback((resizing) => {
        appSidebarService.setResizing(resizing);
    }, [appSidebarService]);
    const handleWidthChange = useCallback((width) => {
        appSidebarService.setWidth(width);
    }, [appSidebarService]);
    const handleClose = useCallback(() => {
        appSidebarService.setOpen(false);
    }, [appSidebarService]);
    useEffect(() => {
        if (sidebarState !== 'floating' || resizing) {
            return;
        }
        const onMouseMove = (e) => {
            const menuElement = document.querySelector('body > [data-radix-popper-content-wrapper] > [data-radix-menu-content]');
            if (menuElement) {
                return;
            }
            if (e.clientX > width + 20) {
                appSidebarService.setHovering(false);
            }
        };
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, [appSidebarService, resizing, sidebarState, width]);
    const resizeHandleDropTargetOptions = useMemo(() => {
        return () => ({
            data: () => {
                const firstView = workbenchService.views$.value.at(0);
                if (!firstView) {
                    return {};
                }
                return {
                    at: 'workbench:resize-handle',
                    edge: 'left', // left of the first view
                    viewId: firstView.id,
                };
            },
            canDrop: (data) => {
                return ((!!data.source.data.entity?.type &&
                    allowedSplitViewEntityTypes.has(data.source.data.entity?.type)) ||
                    data.source.data.from?.at === 'workbench:link');
            },
        });
    }, [workbenchService.views$.value]);
    return (_jsxs(_Fragment, { children: [_jsx(ResizePanel, { resizeHandleDropTargetOptions: resizeHandleDropTargetOptions, floating: sidebarState === 'floating' || sidebarState === 'floating-with-mask', open: sidebarState !== 'close', resizing: resizing, maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, width: width, resizeHandlePos: "right", onOpen: handleOpenChange, onResizing: handleResizing, onWidthChange: handleWidthChange, unmountOnExit: false, className: clsx(navWrapperStyle, {
                    [hoverNavWrapperStyle]: sidebarState === 'floating',
                }), resizeHandleOffset: 0, resizeHandleVerticalPadding: clientBorder ? 16 : 0, resizeHandleTooltip: _jsx(ResizeHandleTooltipContent, {}), resizeHandleTooltipOptions: {
                    side: 'right',
                    align: 'center',
                }, resizeHandleTooltipShortcut: ['$mod', '/'], resizeHandleTooltipShortcutClassName: resizeHandleShortcutStyle, "data-transparent": true, "data-open": sidebarState !== 'close', "data-has-border": hasRightBorder, "data-testid": "app-sidebar-wrapper", "data-is-macos-electron": isMacosDesktop, "data-client-border": clientBorder, "data-is-electron": BUILD_CONFIG.isElectron, children: _jsxs("nav", { className: navStyle, "data-testid": "app-sidebar", children: [!BUILD_CONFIG.isElectron && sidebarState !== 'floating' && (_jsx(SidebarHeader, {})), _jsx("div", { className: navBodyStyle, "data-testid": "sliderBar-inner", children: children })] }) }), _jsx("div", { "data-testid": "app-sidebar-float-mask", "data-open": open, "data-is-floating": sidebarState === 'floating-with-mask', className: sidebarFloatMaskStyle, onClick: handleClose })] }));
}
const ResizeHandleTooltipContent = () => {
    const t = useI18n();
    return (_jsxs("div", { children: [_jsx("div", { children: t['com.affine.rootAppSidebar.resize-handle.tooltip.drag']() }), _jsx("div", { children: t['com.affine.rootAppSidebar.resize-handle.tooltip.click']() })] }));
};
export function FallbackHeader() {
    return (_jsx("div", { className: styles.fallbackHeader, children: _jsx(FallbackHeaderSkeleton, {}) }));
}
export function FallbackHeaderWithWorkspaceNavigator() {
    // if navigate is not defined, it is rendered outside of router
    // WorkspaceNavigator requires navigate context
    // todo: refactor
    const navigate = useContext(NavigateContext);
    const currentWorkspace = useServiceOptional(WorkspaceService);
    return (_jsx("div", { className: styles.fallbackHeader, children: currentWorkspace && navigate ? (_jsx(WorkspaceNavigator, { showSyncStatus: true, showEnableCloudButton: true, dense: true })) : (_jsx(FallbackHeaderSkeleton, {})) }));
}
export function FallbackHeaderSkeleton() {
    return (_jsxs(_Fragment, { children: [_jsx(Skeleton, { variant: "rectangular", width: 32, height: 32 }), _jsx(Skeleton, { variant: "rectangular", width: 150, height: 32, flex: 1 }), _jsx(Skeleton, { variant: "circular", width: 25, height: 25 })] }));
}
const randomWidth = () => {
    return Math.floor(Math.random() * 200) + 100;
};
const RandomBar = ({ className }) => {
    const width = useMemo(() => randomWidth(), []);
    return (_jsx(Skeleton, { variant: "rectangular", width: width, height: 16, className: className }));
};
const RandomBars = ({ count, header }) => {
    return (_jsxs("div", { className: styles.fallbackGroupItems, children: [header ? (_jsx(Skeleton, { className: styles.fallbackItemHeader, variant: "rectangular", width: 50, height: 16 })) : null, Array.from({ length: count }).map((_, index) => (
            // oxlint-disable-next-line eslint-plugin-react(no-array-index-key)
            _jsx(RandomBar, {}, index)))] }));
};
const FallbackBody = () => {
    return (_jsxs("div", { className: styles.fallbackBody, children: [_jsx(RandomBars, { count: 3 }), _jsx(RandomBars, { count: 4, header: true }), _jsx(RandomBars, { count: 4, header: true }), _jsx(RandomBars, { count: 3, header: true })] }));
};
export const AppSidebarFallback = () => {
    const appSidebarService = useService(AppSidebarService).sidebar;
    const width = useLiveData(appSidebarService.width$);
    const { appSettings } = useAppSettingHelper();
    const clientBorder = appSettings.clientBorder;
    return (_jsx("div", { style: { width }, className: navWrapperStyle, "data-has-border": !BUILD_CONFIG.isElectron && !clientBorder, "data-open": "true", children: _jsxs("nav", { className: navStyle, children: [!BUILD_CONFIG.isElectron ? _jsx("div", { className: navHeaderStyle }) : null, _jsx("div", { className: navBodyStyle, children: _jsxs("div", { className: styles.fallback, children: [_jsx(FallbackHeaderWithWorkspaceNavigator, {}), _jsx(FallbackBody, {})] }) })] }) }));
};
/**
 * NOTE(@forehalo): this is a copy of [AppSidebarFallback] without [WorkspaceNavigator] which will introduce a lot useless dependencies for shell(tab bar)
 */
export const ShellAppSidebarFallback = () => {
    const appSidebarService = useService(AppSidebarService).sidebar;
    const width = useLiveData(appSidebarService.width$);
    const { appSettings } = useAppSettingHelper();
    const clientBorder = appSettings.clientBorder;
    return (_jsx("div", { style: { width }, className: navWrapperStyle, "data-has-border": !BUILD_CONFIG.isElectron && !clientBorder, "data-open": "true", children: _jsxs("nav", { className: navStyle, children: [!BUILD_CONFIG.isElectron ? _jsx("div", { className: navHeaderStyle }) : null, _jsx("div", { className: navBodyStyle, children: _jsxs("div", { className: styles.fallback, children: [_jsx(FallbackHeader, {}), _jsx(FallbackBody, {})] }) })] }) }));
};
export * from './add-page-button';
export * from './app-download-button';
export * from './app-updater-button';
export * from './category-divider';
export * from './index.css';
export * from './menu-item';
export * from './open-in-app-card';
export * from './quick-search-input';
export * from './sidebar-containers';
export * from './sidebar-header';
//# sourceMappingURL=index.js.map