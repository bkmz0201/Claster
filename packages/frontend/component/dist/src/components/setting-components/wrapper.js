import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { wrapper, wrapperDisabled } from './share.css';
export const SettingWrapper = ({ id, title, children, disabled, testId, }) => {
    return (_jsxs("div", { id: id, className: clsx(wrapper, disabled && wrapperDisabled), "data-testid": testId, "aria-disabled": disabled, children: [title ? _jsx("div", { className: "title", children: title }) : null, children] }));
};
//# sourceMappingURL=wrapper.js.map