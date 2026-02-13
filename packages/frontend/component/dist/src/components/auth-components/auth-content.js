import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { authContent } from './share.css';
export const AuthContent = ({ children, className, ...otherProps }) => {
    return (_jsx("div", { className: clsx(authContent, className), ...otherProps, children: children }));
};
//# sourceMappingURL=auth-content.js.map