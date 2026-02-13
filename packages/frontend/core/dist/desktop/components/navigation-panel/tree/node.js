import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContextMenu, DropIndicator, IconAndNameEditorMenu, IconButton, IconRenderer, Menu, MenuItem, useDraggable, useDropTarget, } from '@affine/component';
import { Guard } from '@affine/core/components/guard';
import { AppSidebarService } from '@affine/core/modules/app-sidebar';
import { ExplorerIconService } from '@affine/core/modules/explorer-icon/services/explorer-icon';
import { WorkbenchLink } from '@affine/core/modules/workbench';
import { useI18n } from '@affine/i18n';
import { ArrowDownSmallIcon, EditIcon, MoreHorizontalIcon, } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useLiveData, useService } from '@toeverything/infra';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { Fragment, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, } from 'react';
import { NavigationPanelTreeContext } from './context';
import { DropEffect } from './drop-effect';
import * as styles from './node.css';
/**
 * specific rename modal for navigation panel tree node,
 * Separate it into a separate component to prevent re-rendering the entire component when width changes.
 */
export const NavigationPanelTreeNodeRenameModal = ({ setRenaming, handleRename, rawName, explorerIconConfig, className, fallbackIcon, }) => {
    const explorerIconService = useService(ExplorerIconService);
    const appSidebarService = useService(AppSidebarService).sidebar;
    const sidebarWidth = useLiveData(appSidebarService.width$);
    const explorerIcon = useLiveData(useMemo(() => explorerIconConfig
        ? explorerIconService.icon$(explorerIconConfig.where, explorerIconConfig.id)
        : null, [explorerIconConfig, explorerIconService]));
    const onIconChange = useCallback((data) => {
        if (!explorerIconConfig)
            return;
        explorerIconService.setIcon({
            where: explorerIconConfig.where,
            id: explorerIconConfig.id,
            icon: data,
        });
    }, [explorerIconConfig, explorerIconService]);
    return (_jsx(IconAndNameEditorMenu, { open: true, onOpenChange: setRenaming, onIconChange: onIconChange, onNameChange: handleRename, name: rawName ?? '', icon: explorerIcon?.icon, width: sidebarWidth - 16, contentOptions: {
            sideOffset: 36,
        }, iconPlaceholder: fallbackIcon, inputTestId: "rename-modal-input", children: _jsx("div", { className: clsx(styles.itemRenameAnchor, className) }) }));
};
export const NavigationPanelTreeNode = ({ children, icon: Icon, name: rawName, onClick, to, active, defaultRenaming, renameable, renameableGuard, onRename, disabled, collapsed, setCollapsed, collapsible = true, canDrop, reorderable = true, operations = [], postfix, childrenOperations = [], childrenPlaceholder, linkComponent: LinkComponent = WorkbenchLink, dndData, explorerIconConfig, onDrop, dropEffect, ...otherProps }) => {
    const explorerIconService = useService(ExplorerIconService);
    const t = useI18n();
    const cid = useId();
    const context = useContext(NavigationPanelTreeContext);
    const level = context?.level ?? 0;
    // If no onClick or to is provided, clicking on the node will toggle the collapse state
    const clickForCollapse = !onClick && !to && !disabled;
    const [childCount, setChildCount] = useState(0);
    const [renaming, setRenaming] = useState(defaultRenaming);
    const [lastInGroup, setLastInGroup] = useState(false);
    const rootRef = useRef(null);
    const explorerIcon = useLiveData(useMemo(() => explorerIconConfig
        ? explorerIconService.icon$(explorerIconConfig?.where, explorerIconConfig?.id)
        : null, [explorerIconConfig, explorerIconService]));
    const { dragRef, dragging, CustomDragPreview } = useDraggable(() => ({
        data: { ...dndData?.draggable, __cid: cid },
        dragPreviewPosition: 'pointer-outside',
    }), [cid, dndData]);
    const handleCanDrop = useMemo(() => args => {
        if (!reorderable && args.treeInstruction?.type !== 'make-child') {
            return false;
        }
        return (typeof canDrop === 'function' ? canDrop(args) : canDrop) ?? true;
    }, [canDrop, reorderable]);
    const { dropTargetRef, treeInstruction, draggedOverDraggable, draggedOver, draggedOverPosition, } = useDropTarget(() => ({
        data: dndData?.dropTarget,
        treeInstruction: {
            currentLevel: level,
            indentPerLevel: 20,
            mode: !collapsed
                ? 'expanded'
                : lastInGroup
                    ? 'last-in-group'
                    : 'standard',
            block: reorderable === false
                ? ['reorder-above', 'reorder-below', 'reparent']
                : [],
        },
        onDrop: data => {
            if (data.source.data.__cid === cid &&
                data.treeInstruction?.type !== 'reparent') {
                // Do nothing if dropped on self
                return;
            }
            onDrop?.(data);
            if (data.treeInstruction?.type === 'make-child' && collapsible) {
                setCollapsed(false);
            }
        },
        canDrop: handleCanDrop,
        allowExternal: true,
    }), [
        dndData?.dropTarget,
        level,
        collapsed,
        lastInGroup,
        reorderable,
        handleCanDrop,
        cid,
        onDrop,
        collapsible,
        setCollapsed,
    ]);
    const isSelfDraggedOver = draggedOverDraggable?.data.__cid === cid;
    useEffect(() => {
        if (draggedOver &&
            treeInstruction?.type === 'make-child' &&
            !isSelfDraggedOver) {
            if (!collapsible)
                return;
            // auto expand when dragged over
            const timeout = setTimeout(() => {
                setCollapsed(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
        return;
    }, [
        collapsible,
        draggedOver,
        isSelfDraggedOver,
        setCollapsed,
        treeInstruction?.type,
    ]);
    useEffect(() => {
        if (rootRef.current) {
            const parent = rootRef.current.parentElement;
            if (parent) {
                const updateLastInGroup = () => {
                    setLastInGroup(parent?.lastElementChild === rootRef.current);
                };
                updateLastInGroup();
                const observer = new MutationObserver(updateLastInGroup);
                observer.observe(parent, {
                    childList: true,
                });
                return () => observer.disconnect();
            }
        }
        return;
    }, []);
    const presetOperations = useMemo(() => [
        renameable
            ? {
                index: 0,
                view: renameableGuard ? (_jsx(Guard, { permission: renameableGuard.action, docId: renameableGuard.docId, children: can => (_jsx(MenuItem, { type: 'default', prefixIcon: _jsx(EditIcon, {}), onClick: () => setRenaming(true), disabled: !can, children: t['com.affine.menu.rename']() }, 'navigation-panel-tree-rename')) })) : (_jsx(MenuItem, { type: 'default', prefixIcon: _jsx(EditIcon, {}), onClick: () => setRenaming(true), children: t['com.affine.menu.rename']() }, 'navigation-panel-tree-rename')),
            }
            : null,
    ].filter((t) => t !== null), [renameable, renameableGuard, t]);
    const { menuOperations, inlineOperations } = useMemo(() => {
        const sorted = [...presetOperations, ...operations].sort((a, b) => a.index - b.index);
        return {
            menuOperations: sorted.filter(({ inline }) => !inline),
            inlineOperations: sorted.filter(({ inline }) => !!inline),
        };
    }, [presetOperations, operations]);
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
        if (!collapsible)
            return;
        setCollapsed(!collapsed);
    }, [collapsed, collapsible, setCollapsed]);
    const handleRename = useCallback((newName) => {
        onRename?.(newName);
    }, [onRename]);
    const handleClick = useCallback((e) => {
        if (e.defaultPrevented) {
            return;
        }
        if (!clickForCollapse) {
            onClick?.();
        }
        else if (collapsible) {
            setCollapsed(!collapsed);
        }
    }, [clickForCollapse, collapsed, collapsible, onClick, setCollapsed]);
    const fallbackIcon = Icon && (_jsx(Icon, { draggedOver: draggedOver && !isSelfDraggedOver, treeInstruction: treeInstruction, collapsed: collapsed }));
    const content = (_jsxs("div", { onClick: handleClick, className: styles.itemRoot, "data-active": active, "data-disabled": disabled, "data-collapsible": collapsible, children: [_jsxs("div", { className: styles.toggleIcon, children: [_jsx("div", { "data-disabled": disabled, onClick: handleCollapsedChange, "data-testid": "navigation-panel-collapsed-button", className: styles.collapsedIconContainer, children: _jsx(ArrowDownSmallIcon, { className: styles.collapsedIcon, "data-collapsed": collapsed !== false }) }), _jsx("div", { className: styles.iconContainer, children: _jsx(IconRenderer, { data: explorerIcon?.icon, fallback: fallbackIcon }) })] }), _jsxs("div", { className: styles.itemMain, children: [_jsx("div", { className: styles.itemContent, children: rawName }), postfix, _jsxs("div", { className: styles.postfix, onClick: e => {
                            // prevent jump to page
                            e.preventDefault();
                        }, children: [inlineOperations.map(({ view, index }) => (_jsx(Fragment, { children: view }, index))), menuOperations.length > 0 && (_jsx(Menu, { items: menuOperations.map(({ view, index }) => (_jsx(Fragment, { children: view }, index))), children: _jsx(IconButton, { size: "16", "data-testid": "navigation-panel-tree-node-operation-button", style: { marginLeft: 4 }, children: _jsx(MoreHorizontalIcon, {}) }) }))] })] }), renameable && renaming && (_jsx(NavigationPanelTreeNodeRenameModal, { setRenaming: setRenaming, handleRename: handleRename, rawName: rawName, explorerIconConfig: explorerIconConfig, fallbackIcon: fallbackIcon }))] }));
    return (_jsxs(Collapsible.Root, { open: !collapsed, onOpenChange: setCollapsed, style: assignInlineVars({
            [styles.levelIndent]: `${level * 20}px`,
        }), ref: rootRef, ...otherProps, children: [_jsx(ContextMenu, { asChild: true, items: menuOperations.map(({ view, index }) => (_jsx(Fragment, { children: view }, index))), children: _jsxs("div", { className: clsx(styles.contentContainer, styles.draggedOverEffect), "data-open": !collapsed, "data-self-dragged-over": isSelfDraggedOver, ref: dropTargetRef, children: [to ? (_jsx(LinkComponent, { to: to, className: styles.linkItemRoot, ref: dragRef, draggable: false, children: content })) : (_jsx("div", { ref: dragRef, children: content })), _jsx(CustomDragPreview, { children: _jsx("div", { className: styles.draggingContainer, children: content }) }), treeInstruction &&
                            // Do not show drop indicator for self dragged over
                            !(treeInstruction.type !== 'reparent' && isSelfDraggedOver) &&
                            treeInstruction.type !== 'instruction-blocked' && (_jsx(DropIndicator, { instruction: treeInstruction })), draggedOver &&
                            dropEffect &&
                            draggedOverPosition &&
                            !isSelfDraggedOver &&
                            draggedOverDraggable && (_jsx(DropEffect, { dropEffect: dropEffect({
                                source: draggedOverDraggable,
                                treeInstruction: treeInstruction,
                            }), position: draggedOverPosition }))] }) }), _jsxs(Collapsible.Content, { style: { display: dragging ? 'none' : undefined }, children: [_jsx("div", { className: styles.collapseContentPlaceholder, children: childCount === 0 && !collapsed ? childrenPlaceholder : null }), _jsx(NavigationPanelTreeContext.Provider, { value: contextValue, children: collapsed ? null : children })] })] }));
};
//# sourceMappingURL=node.js.map