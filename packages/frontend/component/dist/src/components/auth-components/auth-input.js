import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { Input } from '../../ui/input';
import * as styles from './share.css';
export const AuthInput = ({ label, error, errorHint, onEnter, className, ...inputProps }) => {
    return (_jsxs("div", { className: clsx(styles.authInputWrapper, {
            'with-hint': !!errorHint,
        }), children: [label ? _jsx("label", { children: label }) : null, _jsx(Input, { className: clsx(className), size: "extraLarge", status: error ? 'error' : 'default', onEnter: onEnter, ...inputProps }), error && errorHint ? (_jsx("div", { className: styles.authInputError, children: errorHint })) : null] }));
};
//# sourceMappingURL=auth-input.js.map