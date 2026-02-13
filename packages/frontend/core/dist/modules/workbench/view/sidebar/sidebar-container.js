import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback } from 'react';
import { ViewService } from '../../services/view';
import { WorkbenchService } from '../../services/workbench';
import { ViewSidebarTabBodyTarget } from '../view-islands';
import * as styles from './sidebar-container.css';
import { Header } from './sidebar-header';
import { SidebarHeaderSwitcher } from './sidebar-header-switcher';
export const SidebarContainer = ({ className, ...props }) => {
    const workbenchService = useService(WorkbenchService);
    const workbench = workbenchService.workbench;
    const viewService = useService(ViewService);
    const view = viewService.view;
    const sidebarTabs = useLiveData(view.sidebarTabs$);
    const activeSidebarTab = useLiveData(view.activeSidebarTab$);
    const handleToggleOpen = useCallback(() => {
        workbench.toggleSidebar();
    }, [workbench]);
    return (_jsxs("div", { className: clsx(styles.sidebarContainerInner, className), ...props, children: [_jsx(Header, { onToggle: handleToggleOpen, children: _jsx(SidebarHeaderSwitcher, {}) }), sidebarTabs.length > 0 ? (sidebarTabs.map(sidebar => (_jsx(ViewSidebarTabBodyTarget, { tabId: sidebar.id, style: { display: activeSidebarTab === sidebar ? 'block' : 'none' }, viewId: view.id, className: clsx(styles.sidebarBodyTarget, !BUILD_CONFIG.isElectron && styles.borderTop), "data-testid": `sidebar-tab-content-${sidebar.id}` }, sidebar.id)))) : (_jsx("div", { className: styles.sidebarBodyNoSelection, children: "No Selection" }))] }));
};
//# sourceMappingURL=sidebar-container.js.map