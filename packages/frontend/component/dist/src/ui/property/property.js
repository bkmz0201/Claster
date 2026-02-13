import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownSmallIcon, ArrowUpSmallIcon, ToggleDownIcon, } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { createContext, forwardRef, useCallback, useContext, useLayoutEffect, useMemo, useState, } from 'react';
import { Button } from '../button';
import { DropIndicator } from '../dnd';
import { Menu } from '../menu';
import * as styles from './property.css';
const PropertyTableContext = createContext(null);
export const PropertyCollapsibleSection = forwardRef(({ children, defaultCollapsed = false, collapsed, onCollapseChange, icon, title, suffix, className, ...props }, ref) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const handleCollapse = useCallback((open) => {
        setInternalCollapsed(!open);
        onCollapseChange?.(!open);
    }, [onCollapseChange]);
    const finalCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;
    return (_jsxs(Collapsible.Root, { ...props, ref: ref, className: clsx(styles.section, className), open: !finalCollapsed, onOpenChange: handleCollapse, "data-testid": "property-collapsible-section", children: [_jsxs("div", { className: styles.sectionHeader, "data-testid": "property-collapsible-section-header", children: [_jsxs(Collapsible.Trigger, { role: "button", "data-testid": "property-collapsible-section-trigger", className: styles.sectionHeaderTrigger, children: [icon && _jsx("div", { className: styles.sectionHeaderIcon, children: icon }), _jsx("div", { "data-collapsed": finalCollapsed, className: styles.sectionHeaderName, children: title }), _jsx(ToggleDownIcon, { className: styles.sectionCollapsedIcon, "data-collapsed": finalCollapsed })] }), suffix] }), _jsx(Collapsible.Content, { "data-testid": "property-collapsible-section-content", className: styles.sectionContent, children: children })] }));
});
PropertyCollapsibleSection.displayName = 'PropertyCollapsibleSection';
export const PropertyCollapsibleContent = forwardRef(({ children, collapsible = true, collapsed, defaultCollapsed, onCollapseChange, collapseButtonText, className, ...props }, ref) => {
    const [propertyCount, setPropertyCount] = useState({ total: 0, hide: 0 });
    const [showAllHide, setShowAllHide] = useState(!defaultCollapsed);
    const finalCollapsible = collapsible ? propertyCount.hide !== 0 : false;
    const controlled = collapsed !== undefined;
    const finalShowAllHide = finalCollapsible
        ? !controlled
            ? showAllHide
            : !collapsed
        : true;
    const mountProperty = useCallback((payload) => {
        setPropertyCount(prev => ({
            total: prev.total + 1,
            hide: prev.hide + (payload.isHide ? 1 : 0),
        }));
        return () => {
            setPropertyCount(prev => ({
                total: prev.total - 1,
                hide: prev.hide - (payload.isHide ? 1 : 0),
            }));
        };
    }, []);
    const contextValue = useMemo(() => ({ mountProperty, showAllHide: finalShowAllHide }), [mountProperty, finalShowAllHide]);
    const handleShowAllHide = useCallback(() => {
        setShowAllHide(!finalShowAllHide);
        onCollapseChange?.(finalShowAllHide);
    }, [finalShowAllHide, onCollapseChange]);
    return (_jsx("div", { ref: ref, "data-property-collapsible": finalCollapsible, "data-property-collapsed": !finalShowAllHide, className: clsx(styles.propertyTableContent, className), ...props, children: _jsxs(PropertyTableContext.Provider, { value: contextValue, children: [children, finalCollapsible && (_jsx(Button, { variant: "plain", prefix: !finalShowAllHide ? (_jsx(ArrowDownSmallIcon, {})) : (_jsx(ArrowUpSmallIcon, {})), className: styles.tableButton, onClick: handleShowAllHide, "data-testid": "property-collapsible-button", children: collapseButtonText
                        ? collapseButtonText({
                            total: propertyCount.total,
                            hide: propertyCount.hide,
                            isCollapsed: !finalShowAllHide,
                        })
                        : !finalShowAllHide
                            ? 'Show All'
                            : 'Hide' }))] }) }));
});
PropertyCollapsibleContent.displayName = 'PropertyCollapsible';
const PropertyRootContext = createContext(null);
export const PropertyRoot = forwardRef(({ children, className, dropIndicatorEdge, hideEmpty, hide, ...props }, ref) => {
    const [isEmpty, setIsEmpty] = useState(false);
    const context = useContext(PropertyTableContext);
    const preferHide = hide || (hideEmpty && isEmpty);
    const showAllHide = context?.showAllHide;
    const shouldHide = preferHide && !showAllHide;
    useLayoutEffect(() => {
        if (context) {
            return context.mountProperty({ isHide: !!preferHide });
        }
        return;
    }, [context, preferHide]);
    const contextValue = useMemo(() => ({
        mountValue: (payload) => {
            setIsEmpty(payload.isEmpty);
            return () => {
                setIsEmpty(false);
            };
        },
    }), [setIsEmpty]);
    return (_jsx(PropertyRootContext.Provider, { value: contextValue, children: _jsxs("div", { ref: ref, className: clsx(styles.propertyRoot, shouldHide && styles.hide, className), ...props, children: [children, _jsx(DropIndicator, { edge: dropIndicatorEdge })] }) }));
});
PropertyRoot.displayName = 'PropertyRoot';
export const PropertyName = ({ icon, name, className, menuItems, defaultOpenMenu, ...props }) => {
    const [menuOpen, setMenuOpen] = useState(defaultOpenMenu);
    const hasMenu = !!menuItems;
    const handleClick = useCallback(() => {
        if (!hasMenu)
            return;
        setMenuOpen(true);
    }, [hasMenu]);
    const handleMenuClose = useCallback((open) => {
        if (!open) {
            setMenuOpen(false);
        }
    }, []);
    const content = (_jsx("div", { className: clsx(styles.propertyNameContainer, className), "data-has-menu": hasMenu, onClick: handleClick, ...props, children: _jsxs("div", { className: styles.propertyNameInnerContainer, children: [icon && _jsx("div", { className: styles.propertyIconContainer, children: icon }), _jsx("div", { className: styles.propertyNameContent, children: name })] }) }));
    if (menuOpen && menuItems) {
        // Do not mount <Menu /> when menuOpen is false, as <Menu /> will cause draggable to not work
        return (_jsx(Menu, { items: menuItems, rootOptions: {
                open: true,
                modal: true, // false will case bug
                onOpenChange: handleMenuClose,
            }, children: content }));
    }
    return content;
};
export const PropertyValue = forwardRef(({ children, className, readonly, isEmpty, hoverable = true, ...props }, ref) => {
    const context = useContext(PropertyRootContext);
    useLayoutEffect(() => {
        if (context) {
            return context.mountValue({ isEmpty: !!isEmpty });
        }
        return;
    }, [context, isEmpty]);
    return (_jsx("div", { ref: ref, className: clsx(styles.propertyValueContainer, className), "data-readonly": readonly ? 'true' : 'false', "data-empty": isEmpty ? 'true' : 'false', "data-hoverable": hoverable && !BUILD_CONFIG.isMobileEdition ? 'true' : 'false', "data-property-value": true, ...props, children: children }));
});
PropertyValue.displayName = 'PropertyValue';
//# sourceMappingURL=property.js.map