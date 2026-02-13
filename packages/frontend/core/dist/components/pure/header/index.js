import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppSidebarService } from '@affine/core/modules/app-sidebar';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import * as style from './style.css';
// The Header component is used to solve the following problems
// 1. Manage layout issues independently of page or business logic
// 2. Dynamic centered middle element (relative to the main-container), when the middle element is detected to collide with the two elements, the line wrapping process is performed
export const Header = ({ left, center, right }) => {
    const appSidebarService = useService(AppSidebarService).sidebar;
    const open = useLiveData(appSidebarService.open$);
    return (_jsxs("div", { className: clsx(style.header), "data-open": open, "data-testid": "header", children: [_jsx("div", { className: clsx(style.headerSideContainer), children: _jsx("div", { className: clsx(style.headerItem, 'left'), children: _jsx("div", { children: left }) }) }), _jsx("div", { className: clsx({
                    [style.headerCenter]: center,
                }), children: center }), _jsx("div", { className: clsx(style.headerSideContainer, 'right'), children: _jsx("div", { className: clsx(style.headerItem, 'right'), children: right }) })] }));
};
Header.displayName = 'Header';
export const HeaderDivider = () => {
    return _jsx("div", { className: style.headerDivider });
};
//# sourceMappingURL=index.js.map