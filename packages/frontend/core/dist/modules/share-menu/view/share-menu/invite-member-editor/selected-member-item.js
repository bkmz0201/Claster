import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CloseIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';
import * as styles from './selected-member-item.css';
export const SelectedMemberItem = ({ member, idx, onRemoved, style, }) => {
    const handleRemove = useCallback(e => {
        e.stopPropagation();
        onRemoved?.();
    }, [onRemoved]);
    return (_jsx("div", { className: styles.member, "data-idx": idx, style: {
            ...style,
        }, children: _jsxs("div", { className: styles.memberInnerWrapper, children: [_jsx("div", { className: styles.label, children: member.name }), onRemoved ? (_jsx("div", { className: styles.remove, onClick: handleRemove, children: _jsx(CloseIcon, {}) })) : null] }) }));
};
//# sourceMappingURL=selected-member-item.js.map