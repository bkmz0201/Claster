import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { AffineErrorBoundary } from '@affine/core/components/affine/affine-error-boundary';
import { RightSidebarIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { Suspense, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebarService } from '../../app-sidebar';
import { SidebarSwitch } from '../../app-sidebar/views/sidebar-header';
import { ViewService } from '../services/view';
import { WorkbenchService } from '../services/workbench';
import * as styles from './route-container.css';
import { useViewPosition } from './use-view-position';
import { ViewBodyTarget, ViewHeaderTarget } from './view-islands';
const ToggleButton = ({ onToggle, className, show, }) => {
    return (_jsx(IconButton, { size: "24", onClick: onToggle, className: className, "data-show": show, "data-testid": "right-sidebar-toggle", children: _jsx(RightSidebarIcon, {}) }));
};
export const RouteContainer = () => {
    const viewPosition = useViewPosition();
    const appSidebarService = useService(AppSidebarService).sidebar;
    const leftSidebarOpen = useLiveData(appSidebarService.open$);
    const workbench = useService(WorkbenchService).workbench;
    const view = useService(ViewService).view;
    const sidebarOpen = useLiveData(workbench.sidebarOpen$);
    const handleToggleSidebar = useCallback(() => {
        workbench.toggleSidebar();
    }, [workbench]);
    const showSwitch = !BUILD_CONFIG.isElectron && viewPosition.isFirst;
    return (_jsxs("div", { className: styles.root, children: [_jsxs("div", { className: styles.header, "data-show-switch": showSwitch && !leftSidebarOpen, children: [showSwitch && (_jsx(SidebarSwitch, { show: !leftSidebarOpen, className: styles.leftSidebarButton })), _jsx(ViewHeaderTarget, { viewId: view.id, className: styles.viewHeaderContainer }), !BUILD_CONFIG.isElectron && viewPosition.isLast && (_jsx(ToggleButton, { show: !sidebarOpen, className: styles.rightSidebarButton, onToggle: handleToggleSidebar }))] }), _jsx(AffineErrorBoundary, { children: _jsx(Suspense, { children: _jsx(Outlet, {}) }) }), _jsx(ViewBodyTarget, { viewId: view.id, className: styles.viewBodyContainer })] }));
};
//# sourceMappingURL=route-container.js.map