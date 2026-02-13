import { jsx as _jsx } from "react/jsx-runtime";
import { useLiveData, useService } from '@toeverything/infra';
import { AppSidebarService } from '../../services/app-sidebar';
import { navHeaderStyle } from '../index.css';
import { SidebarSwitch } from './sidebar-switch';
export const SidebarHeader = () => {
    const appSidebarService = useService(AppSidebarService).sidebar;
    const open = useLiveData(appSidebarService.open$);
    return (_jsx("div", { className: navHeaderStyle, "data-open": open, children: _jsx(SidebarSwitch, { show: open }) }));
};
export * from './sidebar-switch';
//# sourceMappingURL=index.js.map