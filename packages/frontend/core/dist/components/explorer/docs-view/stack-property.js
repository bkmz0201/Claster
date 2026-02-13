import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as styles from './properties.css';
export const StackProperty = ({ icon, children, }) => {
    return (_jsx("div", { className: styles.stackItem, children: _jsxs("div", { className: styles.stackItemContent, children: [icon ? _jsx("div", { className: styles.stackItemIcon, children: icon }) : null, _jsx("div", { className: styles.stackItemLabel, children: children })] }) }));
};
//# sourceMappingURL=stack-property.js.map