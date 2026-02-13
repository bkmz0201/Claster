import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { NavigationPanelTreeContext } from './context';
import * as styles from './root.css';
export const NavigationPanelTreeRoot = ({ children, childrenOperations = [], placeholder, }) => {
    const [childCount, setChildCount] = useState(0);
    const contextValue = useMemo(() => {
        return {
            operations: childrenOperations,
            level: 0,
            registerChild: () => {
                setChildCount(c => c + 1);
                return () => setChildCount(c => c - 1);
            },
        };
    }, [childrenOperations]);
    return (
    // <div> is for placeholder:last-child selector
    _jsxs("div", { children: [_jsx("div", { className: styles.placeholder, children: childCount === 0 && placeholder }), _jsx(NavigationPanelTreeContext.Provider, { value: contextValue, children: children })] }));
};
//# sourceMappingURL=root.js.map