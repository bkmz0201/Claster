import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResizePanel } from '@affine/component/resize-panel';
import { AffineErrorComponent } from '@affine/core/components/affine/affine-error-boundary/affine-error-fallback';
import { workbenchRoutes } from '@affine/core/desktop/workbench-router';
import { appSettingAtom, FrameworkScope, useLiveData, useService, } from '@toeverything/infra';
import { useAtomValue } from 'jotai';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WorkbenchService } from '../services/workbench';
import { useBindWorkbenchToBrowserRouter } from './browser-adapter';
import { useBindWorkbenchToDesktopRouter } from './desktop-adapter';
import { RouteContainer } from './route-container';
import { SidebarContainer } from './sidebar/sidebar-container';
import { SplitView } from './split-view/split-view';
import { ViewIslandRegistryProvider } from './view-islands';
import { ViewRoot } from './view-root';
import * as styles from './workbench-root.css';
const useAdapter = BUILD_CONFIG.isElectron
    ? useBindWorkbenchToDesktopRouter
    : useBindWorkbenchToBrowserRouter;
const routes = [
    {
        element: _jsx(RouteContainer, {}),
        errorElement: _jsx(AffineErrorComponent, {}),
        children: workbenchRoutes,
    },
];
export const WorkbenchRoot = memo(() => {
    const workbench = useService(WorkbenchService).workbench;
    // for debugging
    window.workbench = workbench;
    const views = useLiveData(workbench.views$);
    const location = useLocation();
    const basename = location.pathname.match(/\/workspace\/[^/]+/g)?.[0] ?? '/';
    useAdapter(workbench, basename);
    const panelRenderer = useCallback((view) => {
        return _jsx(WorkbenchView, { view: view });
    }, []);
    const onMove = useCallback((from, to) => {
        workbench.moveView(from, to);
    }, [workbench]);
    useEffect(() => {
        workbench.updateBasename(basename);
    }, [basename, workbench]);
    return (_jsxs(ViewIslandRegistryProvider, { children: [_jsx(SplitView, { className: styles.workbenchRootContainer, views: views, renderer: panelRenderer, onMove: onMove }), _jsx(WorkbenchSidebar, {})] }));
});
WorkbenchRoot.displayName = 'memo(WorkbenchRoot)';
const WorkbenchView = ({ view }) => {
    const workbench = useService(WorkbenchService).workbench;
    const handleOnFocus = useCallback(() => {
        workbench.active(view);
    }, [workbench, view]);
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            const element = containerRef.current;
            element.addEventListener('pointerdown', handleOnFocus, {
                capture: true,
            });
            return () => {
                element.removeEventListener('pointerdown', handleOnFocus, {
                    capture: true,
                });
            };
        }
        return;
    }, [handleOnFocus]);
    return (_jsx("div", { className: styles.workbenchViewContainer, ref: containerRef, children: _jsx(ViewRoot, { routes: routes, view: view }, view.id) }));
};
const MIN_SIDEBAR_WIDTH = 320;
const MAX_SIDEBAR_WIDTH = 1400;
const WorkbenchSidebar = () => {
    const { clientBorder } = useAtomValue(appSettingAtom);
    const [resizing, setResizing] = useState(false);
    const workbench = useService(WorkbenchService).workbench;
    const sidebarWidth = useLiveData(workbench.sidebarWidth$);
    const [width, setWidth] = useState(workbench.sidebarWidth$.value ?? 0);
    const views = useLiveData(workbench.views$);
    const activeView = useLiveData(workbench.activeView$);
    const sidebarOpen = useLiveData(workbench.sidebarOpen$);
    const [floating, setFloating] = useState(false);
    const onWidthChanged = useCallback((width) => {
        workbench.setSidebarWidth(width);
        setWidth(width);
    }, [workbench]);
    const handleOpenChange = useCallback((open) => {
        if (open) {
            workbench.openSidebar();
        }
        else {
            workbench.closeSidebar();
        }
    }, [workbench]);
    useEffect(() => {
        const onResize = () => setFloating(!!(window.innerWidth < 768));
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    useEffect(() => {
        if (resizing)
            return;
        setWidth(sidebarWidth ?? 0);
    }, [resizing, sidebarWidth]);
    return (_jsx(ResizePanel, { floating: floating, resizeHandlePos: "left", resizeHandleOffset: clientBorder && sidebarOpen ? 3 : 0, width: width, resizing: resizing, onResizing: setResizing, className: styles.workbenchSidebar, "data-client-border": clientBorder && sidebarOpen, open: sidebarOpen ?? false, onOpen: handleOpenChange, onWidthChange: setWidth, onWidthChanged: onWidthChanged, minWidth: MIN_SIDEBAR_WIDTH, maxWidth: MAX_SIDEBAR_WIDTH, unmountOnExit: false, children: views.map(view => (_jsx(FrameworkScope, { scope: view.scope, children: _jsx(SidebarContainer, { style: { display: activeView !== view ? 'none' : undefined } }) }, view.id))) }));
};
//# sourceMappingURL=workbench-root.js.map