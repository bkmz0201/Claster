import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { AppTabs } from '../app-tabs';
import * as styles from './styles.css';
/**
 * A Page is a full-screen container that will not scroll on document.
 */
export const Page = ({ children, tab = true, header, ...attrs }) => {
    // disable scroll on body
    useEffect(() => {
        const prevOverflowY = document.body.style.overflowY;
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = prevOverflowY;
        };
    }, []);
    return (_jsxs("main", { className: styles.page, ...attrs, "data-tab": tab, children: [header, children, tab ? _jsx(AppTabs, { fixed: false }) : null] }));
};
//# sourceMappingURL=index.js.map