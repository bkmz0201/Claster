import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as Dialog from '@radix-ui/react-dialog';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useEffect } from 'react';
import { useTransition } from 'react-transition-state';
import * as styles from './modal.css';
const animationTimeout = 120;
export const QuickSearchModal = ({ onOpenChange, open, children, }) => {
    const [{ status }, toggle] = useTransition({
        timeout: animationTimeout,
    });
    useEffect(() => {
        toggle(open);
    }, [open]);
    return (_jsx(Dialog.Root, { modal: true, open: status !== 'exited', onOpenChange: onOpenChange, children: _jsxs(Dialog.Portal, { children: [_jsx(Dialog.Overlay, { className: styles.modalOverlay }), _jsx("div", { className: styles.modalContentWrapper, children: _jsx(Dialog.Content, { style: assignInlineVars({
                            [styles.animationTimeout]: `${animationTimeout}ms`,
                        }), className: styles.modalContent, "data-state": status, children: children }) })] }) }));
};
//# sourceMappingURL=modal.js.map