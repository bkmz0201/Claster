import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconButton, Modal } from '@affine/component';
import { CloseIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';
import { RenameContent } from './content';
import * as styles from './dialog.css';
export const RenameDialog = ({ open, title, onOpenChange, onConfirm, children, ...props }) => {
    const handleRename = useCallback((value) => {
        onConfirm?.(value);
        onOpenChange?.(false);
    }, [onOpenChange, onConfirm]);
    const close = useCallback(() => {
        onOpenChange?.(false);
    }, [onOpenChange]);
    return (_jsxs(Modal, { width: "100%", open: open, onOpenChange: onOpenChange, withoutCloseButton: true, contentOptions: {
            style: { minHeight: 0, padding: '12px 0', borderRadius: 22 },
        }, children: [_jsxs("div", { className: styles.header, children: [_jsx("span", { className: styles.title, children: title }), _jsx(IconButton, { size: "24", icon: _jsx(CloseIcon, {}), onClick: close })] }), children ?? _jsx(RenameContent, { onConfirm: handleRename, ...props })] }));
};
//# sourceMappingURL=dialog.js.map