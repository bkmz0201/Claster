import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RadioGroup, Scrollable } from '@affine/component';
import { ThemeEditorService } from '@affine/core/modules/theme-editor';
import { useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { ThemeEmpty } from './components/empty';
import { ThemeTreeNode } from './components/tree-node';
import { VariableList } from './components/variable-list';
import { affineThemes } from './resource';
import * as styles from './theme-editor.css';
export const ThemeEditor = () => {
    const themeEditor = useService(ThemeEditorService);
    const [version, setVersion] = useState('v1');
    const [activeNode, setActiveNode] = useState();
    const { nodeMap, variableMap, tree } = affineThemes[version];
    const [customizedNodeIds, setCustomizedNodeIds] = useState(new Set());
    // workaround for the performance issue of using `useLiveData(themeEditor.customTheme$)` here
    useEffect(() => {
        const sub = themeEditor.customTheme$.subscribe(customTheme => {
            const ids = Array.from(new Set([
                ...Object.keys(customTheme?.light ?? {}),
                ...Object.keys(customTheme?.dark ?? {}),
            ])).reduce((acc, name) => {
                const variable = variableMap.get(name);
                if (!variable)
                    return acc;
                variable.ancestors.forEach(id => acc.add(id));
                return acc;
            }, new Set());
            setCustomizedNodeIds(prev => {
                const isSame = Array.from(ids).every(id => prev.has(id)) &&
                    Array.from(prev).every(id => ids.has(id));
                return isSame ? prev : ids;
            });
        });
        return () => sub.unsubscribe();
    }, [themeEditor.customTheme$, variableMap]);
    const onToggleVersion = useCallback((v) => {
        setVersion(v);
        setActiveNode(null);
    }, []);
    const isActive = useCallback((node) => {
        let pointer = activeNode;
        while (pointer) {
            if (!pointer)
                return false;
            if (pointer === node)
                return true;
            pointer = pointer.parentId ? nodeMap.get(pointer.parentId) : undefined;
        }
        return false;
    }, [activeNode, nodeMap]);
    const isCustomized = useCallback((node) => customizedNodeIds.has(node.id), [customizedNodeIds]);
    return (_jsxs("div", { className: styles.root, children: [_jsxs("div", { className: styles.sidebar, children: [_jsx("header", { className: styles.sidebarHeader, children: _jsx(RadioGroup, { width: "100%", value: version, onChange: onToggleVersion, items: ['v1', 'v2'] }) }), _jsxs(Scrollable.Root, { className: styles.sidebarScrollable, children: [_jsx(Scrollable.Viewport, { children: tree.map(node => (_jsx(ThemeTreeNode, { node: node, checked: activeNode ?? undefined, setActive: setActiveNode, isActive: isActive, isCustomized: isCustomized }, node.id))) }), _jsx(Scrollable.Scrollbar, {})] }, version)] }), activeNode ? _jsx(VariableList, { node: activeNode }) : _jsx(ThemeEmpty, {})] }));
};
//# sourceMappingURL=theme-editor.js.map