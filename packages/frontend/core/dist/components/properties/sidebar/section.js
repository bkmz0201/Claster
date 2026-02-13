import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { ToggleRightIcon } from '@blocksuite/icons/rc';
import { Trigger as CollapsibleTrigger } from '@radix-ui/react-collapsible';
import * as styles from './section.css';
export const WorkspacePropertyListSidebarSection = () => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.headerRoot, children: [_jsx("span", { className: styles.headerTitle, children: t['com.affine.propertySidebar.property-list.section']() }), _jsx(CollapsibleTrigger, { asChild: true, children: _jsx(IconButton, { children: _jsx(ToggleRightIcon, { className: styles.collapseIcon }) }) })] }));
};
export const AddWorkspacePropertySidebarSection = () => {
    const t = useI18n();
    return (_jsxs("div", { className: styles.headerRoot, children: [_jsx("span", { className: styles.headerTitle, children: t['com.affine.propertySidebar.add-more.section']() }), _jsx(CollapsibleTrigger, { asChild: true, children: _jsx(IconButton, { children: _jsx(ToggleRightIcon, { className: styles.collapseIcon }) }) })] }));
};
//# sourceMappingURL=section.js.map