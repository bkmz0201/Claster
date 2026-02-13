import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { settingRow } from './share.css';
export const SettingRow = ({ name, desc, children, onClick, style, spreadCol = true, disabled = false, className, ...props }) => {
    return (_jsxs("div", { className: clsx(settingRow, {
            'two-col': spreadCol,
            disabled,
        }, className), style: style, onClick: onClick, "data-testid": props['data-testid'], children: [_jsxs("div", { className: "left-col", children: [_jsx("div", { className: "name", children: name }), desc && _jsx("div", { className: "desc", children: desc })] }), spreadCol ? _jsx("div", { className: "right-col", children: children }) : children] }));
};
//# sourceMappingURL=setting-row.js.map