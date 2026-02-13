import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { ToggleRightIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useCallback, } from 'react';
import { content, triggerActions, triggerCollapseIcon, triggerLabel, triggerRoot, } from './collapsible-section.css';
const CollapsibleSectionTrigger = forwardRef(function CollapsibleSectionTrigger({ actions, label, collapsed, setCollapsed, className, ...attrs }, ref) {
    const collapsible = collapsed !== undefined;
    return (_jsxs("div", { className: clsx(triggerRoot, className), ref: ref, role: "switch", onClick: () => setCollapsed?.(!collapsed), "data-collapsed": collapsed, "data-collapsible": collapsible, ...attrs, children: [_jsxs("div", { className: triggerLabel, children: [label, collapsible ? (_jsx(ToggleRightIcon, { width: 16, height: 16, "data-testid": "category-divider-collapse-button", className: triggerCollapseIcon })) : null] }), _jsx("div", { className: triggerActions, onClick: e => e.stopPropagation(), children: actions })] }));
});
export const CollapsibleSection = ({ path, title, actions, testId, headerClassName, headerTestId, contentClassName, children, ...attrs }) => {
    const navigationPanelService = useService(NavigationPanelService);
    const collapsed = useLiveData(navigationPanelService.collapsed$(path));
    const setCollapsed = useCallback((v) => navigationPanelService.setCollapsed(path, v), [navigationPanelService, path]);
    return (_jsxs(Collapsible.Root, { "data-collapsed": collapsed, open: !collapsed, "data-testid": testId, ...attrs, children: [_jsx(CollapsibleSectionTrigger, { label: title, actions: actions, collapsed: collapsed, setCollapsed: setCollapsed, "data-testid": headerTestId, className: headerClassName }), _jsx(Collapsible.Content, { "data-testid": "collapsible-section-content", className: clsx(content, contentClassName), children: children })] }));
};
//# sourceMappingURL=collapsible-section.js.map