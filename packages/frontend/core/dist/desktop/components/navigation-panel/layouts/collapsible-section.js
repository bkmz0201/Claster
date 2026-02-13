import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CategoryDivider } from '@affine/core/modules/app-sidebar/views';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, } from 'react';
import { content, header, root } from './collapsible-section.css';
export const CollapsibleSection = ({ path, title, actions, children, className, testId, headerRef, headerTestId, headerClassName, contentClassName, contentStyle, }) => {
    const navigationPanelService = useService(NavigationPanelService);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const setCollapsed = useCallback((v) => {
        navigationPanelService.setCollapsed(path, v);
    }, [navigationPanelService, path]);
    return (_jsxs(Collapsible.Root, { "data-collapsed": collapsed, className: clsx(root, className), open: !collapsed, "data-testid": testId, children: [_jsx(CategoryDivider, { "data-testid": headerTestId, label: title, setCollapsed: setCollapsed, collapsed: collapsed, ref: headerRef, className: clsx(header, headerClassName), children: actions }), _jsx(Collapsible.Content, { "data-testid": "collapsible-section-content", className: clsx(content, contentClassName), style: contentStyle, children: children })] }));
};
//# sourceMappingURL=collapsible-section.js.map