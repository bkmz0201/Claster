import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Logo1Icon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { authHeaderWrapper } from './share.css';
export const AuthHeader = ({ title, subTitle, className }) => {
    return (_jsxs("div", { className: clsx(authHeaderWrapper, className), children: [_jsxs("p", { children: [_jsx(Logo1Icon, { className: "logo" }), title] }), _jsx("p", { children: subTitle })] }));
};
//# sourceMappingURL=auth-header.js.map