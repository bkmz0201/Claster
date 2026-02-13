import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { errorMessage } from './style.css';
export const ErrorMessage = ({ children, inline, style, className, }) => {
    if (inline) {
        return (_jsx("span", { style: style, className: clsx(className, errorMessage), children: children }));
    }
    return (_jsx("div", { style: style, className: clsx(className, errorMessage), children: children }));
};
//# sourceMappingURL=error-message.js.map