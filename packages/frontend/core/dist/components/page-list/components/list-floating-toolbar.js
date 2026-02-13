import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon, DeleteIcon, DeletePermanentlyIcon, ResetIcon, } from '@blocksuite/icons/rc';
import { FloatingToolbar } from './floating-toolbar';
import * as styles from './list-floating-toolbar.css';
export const ListFloatingToolbar = ({ content, onClose, open, onDelete, onRestore, }) => {
    return (_jsxs(FloatingToolbar, { className: styles.floatingToolbar, open: open, children: [_jsx(FloatingToolbar.Item, { children: content }), _jsx(FloatingToolbar.Button, { onClick: onClose, icon: _jsx(CloseIcon, {}) }), (!!onRestore || !!onDelete) && _jsx(FloatingToolbar.Separator, {}), !!onRestore && (_jsx(FloatingToolbar.Button, { onClick: onRestore, icon: _jsx(ResetIcon, {}), "data-testid": "list-toolbar-restore" })), !!onDelete && (_jsx(FloatingToolbar.Button, { onClick: onDelete, icon: onRestore ? _jsx(DeletePermanentlyIcon, {}) : _jsx(DeleteIcon, {}), type: "danger", "data-testid": "list-toolbar-delete" }))] }));
};
//# sourceMappingURL=list-floating-toolbar.js.map