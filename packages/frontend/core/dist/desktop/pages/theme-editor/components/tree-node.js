import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownSmallIcon, PaletteIcon } from '@blocksuite/icons/rc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useCallback, useState } from 'react';
import {} from '../resource';
import * as styles from '../theme-editor.css';
export const ThemeTreeNode = ({ node, checked, setActive, isActive, isCustomized, }) => {
    const isLeaf = !node.children && node.variables;
    const [open, setOpen] = useState(false);
    const onClick = useCallback(() => {
        if (isLeaf || node.variables?.length)
            setActive(node);
        if (node.children)
            setOpen(prev => !prev);
    }, [isLeaf, node, setActive]);
    return (_jsxs(Collapsible.Root, { open: open, children: [_jsxs("div", { "data-checked": node === checked, "data-active": isActive?.(node), "data-customized": isCustomized?.(node), className: styles.treeNode, onClick: onClick, children: [_jsx("div", { className: styles.treeNodeIconWrapper, children: isLeaf ? (_jsx(PaletteIcon, { width: 16, height: 16 })) : (_jsx(ArrowDownSmallIcon, { "data-open": open, className: styles.treeNodeCollapseIcon, width: 20, height: 20 })) }), _jsx("span", { children: node.label })] }), _jsx(Collapsible.Content, { className: styles.treeNodeContent, children: node.children?.map(child => (_jsx(ThemeTreeNode, { node: child, checked: checked, isActive: isActive, setActive: setActive, isCustomized: isCustomized }, child.id))) })] }));
};
//# sourceMappingURL=tree-node.js.map