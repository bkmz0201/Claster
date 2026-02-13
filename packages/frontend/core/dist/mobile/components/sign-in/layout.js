import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SignInBackground } from './background';
import * as styles from './layout.css';
export const MobileSignInLayout = ({ children }) => {
    return (_jsxs("div", { className: styles.root, children: [_jsx(SignInBackground, {}), _jsx("div", { className: styles.content, children: children })] }));
};
//# sourceMappingURL=layout.js.map