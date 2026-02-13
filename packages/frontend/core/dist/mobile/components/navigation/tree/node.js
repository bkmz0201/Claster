import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MobileMenu } from '@affine/component';
import { NavigationPanelTreeContext, } from '@affine/core/desktop/components/navigation-panel';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { extractEmojiIcon } from '@affine/core/utils';
import { ArrowDownSmallIcon, MoreHorizontalIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Fragment, useCallback, useContext, useMemo, useRef, useState, } from 'react';
import { SwipeMenu } from '../../swipe-menu';
import * as styles from './node.css';
export const NavigationPanelTreeNode = ({ children, icon: Icon, name: rawName, onClick, to, active, disabled, collapsed, extractEmojiAsIcon, setCollapsed, operations = [], postfix, childrenOperations = [], childrenPlaceholder, linkComponent: LinkComponent = WorkbenchLink, ...otherProps }) => {
    const context = useContext(NavigationPanelTreeContext);
    const level = context?.level ?? 0;
    // If no onClick or to is provided, clicking on the node will toggle the collapse state
    const clickForCollapse = !onClick && !to && !disabled;
    const [childCount, setChildCount] = useState(0);
    const rootRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const { emoji, name } = useMemo(() => {
        if (!extractEmojiAsIcon || !rawName) {
            return {
                emoji: null,
                name: rawName,
            };
        }
        const { emoji, rest } = extractEmojiIcon(rawName);
        return {
            emoji,
            name: rest,
        };
    }, [extractEmojiAsIcon, rawName]);
    const { menuOperations } = useMemo(() => {
        const sorted = [...operations].sort((a, b) => a.index - b.index);
        return {
            menuOperations: sorted.filter(({ inline }) => !inline),
            inlineOperations: sorted.filter(({ inline }) => !!inline),
        };
    }, [operations]);
    const contextValue = useMemo(() => {
        return {
            operations: childrenOperations,
            level: (context?.level ?? 0) + 1,
            registerChild: () => {
                setChildCount(c => c + 1);
                return () => setChildCount(c => c - 1);
            },
        };
    }, [childrenOperations, context?.level]);
    const handleCollapsedChange = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault(); // for links
        setCollapsed(!collapsed);
    }, [collapsed, setCollapsed]);
    const handleClick = useCallback((e) => {
        if (e.defaultPrevented) {
            return;
        }
        if (!clickForCollapse) {
            onClick?.();
        }
        else {
            setCollapsed(!collapsed);
        }
    }, [clickForCollapse, collapsed, onClick, setCollapsed]);
    const content = (_jsxs("div", { onClick: handleClick, className: styles.itemRoot, "data-active": active, "data-disabled": disabled, children: [_jsxs("div", { className: styles.itemMain, children: [menuOperations.length > 0 ? (_jsx("div", { onClick: e => {
                            // prevent jump to page
                            e.preventDefault();
                        }, children: _jsx(MobileMenu, { items: menuOperations.map(({ view, index }) => (_jsx(Fragment, { children: view }, index))), children: _jsx("div", { className: styles.iconContainer, "data-testid": "menu-trigger", children: emoji ?? (Icon && _jsx(Icon, { collapsed: collapsed })) }) }) })) : (_jsx("div", { className: styles.iconContainer, children: emoji ?? (Icon && _jsx(Icon, { collapsed: collapsed })) })), _jsx("div", { className: styles.itemContent, children: name }), postfix] }), _jsx("div", { "data-disabled": disabled, onClick: handleCollapsedChange, "data-testid": "navigation-panel-collapsed-button", className: styles.collapsedIconContainer, children: _jsx(ArrowDownSmallIcon, { className: styles.collapsedIcon, "data-collapsed": collapsed !== false }) })] }));
    return (_jsxs(Collapsible.Root, { open: !collapsed, onOpenChange: setCollapsed, style: assignInlineVars({
            [styles.levelIndent]: `${level * 20}px`,
        }), ref: rootRef, ...otherProps, children: [_jsx(SwipeMenu, { onExecute: useCallback(() => setMenuOpen(true), []), menu: _jsx(MobileMenu, { rootOptions: useMemo(() => ({ open: menuOpen, onOpenChange: setMenuOpen }), [menuOpen]), items: menuOperations.map(({ view, index }) => (_jsx(Fragment, { children: view }, index))), children: _jsx(MoreHorizontalIcon, { fontSize: 24 }) }), children: _jsx("div", { className: styles.contentContainer, "data-open": !collapsed, children: to ? (_jsx(LinkComponent, { to: to, className: styles.linkItemRoot, draggable: false, children: content })) : (_jsx("div", { children: content })) }) }), _jsxs(Collapsible.Content, { children: [_jsx("div", { className: styles.collapseContentPlaceholder, children: childCount === 0 && !collapsed && childrenPlaceholder }), _jsx(NavigationPanelTreeContext.Provider, { value: contextValue, children: collapsed ? null : children })] })] }));
};
//# sourceMappingURL=node.js.map