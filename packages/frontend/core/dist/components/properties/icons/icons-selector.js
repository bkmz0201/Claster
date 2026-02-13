import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, Scrollable } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { chunk } from 'lodash-es';
import { WorkspacePropertyIconNames, } from './constant';
import * as styles from './icons-selector.css';
import { iconNameToComponent, WorkspacePropertyIcon, } from './workspace-property-icon';
const iconsPerRow = 6;
const iconRows = chunk(WorkspacePropertyIconNames, iconsPerRow);
const IconsSelectorPanel = ({ selectedIcon, onSelectedChange, }) => {
    const t = useI18n();
    return (_jsxs(Scrollable.Root, { children: [_jsx("div", { role: "heading", className: styles.menuHeader, children: t['com.affine.page-properties.icons']() }), _jsxs(Scrollable.Viewport, { className: styles.iconsContainerScrollable, children: [_jsx("div", { className: styles.iconsContainer, children: iconRows.map(iconRow => {
                            return (_jsx("div", { className: styles.iconsRow, children: iconRow.map(iconName => {
                                    const Icon = iconNameToComponent(iconName);
                                    return (_jsx("div", { onClick: () => onSelectedChange(iconName), className: styles.iconButton, "data-name": iconName, "data-active": iconName === selectedIcon, children: _jsx(Icon, {}, iconName) }, iconName));
                                }) }, iconRow.join('-')));
                        }) }), _jsx(Scrollable.Scrollbar, { className: styles.iconsContainerScroller })] })] }));
};
export const WorkspacePropertyIconSelector = ({ propertyInfo, readonly, onSelectedChange, }) => {
    if (readonly) {
        return (_jsx("div", { className: styles.iconSelectorButton, "data-readonly": readonly, children: _jsx(WorkspacePropertyIcon, { propertyInfo: propertyInfo }) }));
    }
    return (_jsx(Menu, { items: _jsx("div", { style: {
                padding: BUILD_CONFIG.isMobileEdition ? '0 20px' : undefined,
            }, children: _jsx(IconsSelectorPanel, { selectedIcon: propertyInfo.icon, onSelectedChange: onSelectedChange }) }), children: _jsx("div", { className: styles.iconSelectorButton, children: _jsx(WorkspacePropertyIcon, { propertyInfo: propertyInfo }) }) }));
};
//# sourceMappingURL=icons-selector.js.map