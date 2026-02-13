import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon } from '@blocksuite/icons/rc';
import { browserWarningStyle, closeButtonStyle, closeIconStyle, } from './index.css';
export const BrowserWarning = ({ show, onClose, message, }) => {
    if (!show) {
        return null;
    }
    return (_jsxs("div", { className: browserWarningStyle, children: [message, _jsx("div", { className: closeButtonStyle, onClick: onClose, children: _jsx(CloseIcon, { className: closeIconStyle }) })] }));
};
export default BrowserWarning;
//# sourceMappingURL=browser-warning.js.map