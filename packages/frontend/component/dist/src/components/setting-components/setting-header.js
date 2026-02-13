import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { settingHeader, settingHeaderBeta } from './share.css';
export const SettingHeader = ({ title, subtitle, beta, ...otherProps }) => {
    return (_jsxs("div", { className: settingHeader, ...otherProps, children: [_jsxs("div", { className: "title", children: [title, beta ? _jsx("div", { className: settingHeaderBeta, children: "Beta" }) : null] }), subtitle ? _jsx("div", { className: "subtitle", children: subtitle }) : null] }));
};
//# sourceMappingURL=setting-header.js.map