import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from '@affine/component';
import { useCallback } from 'react';
import * as styles from './member-item.css';
export const MemberItem = ({ member, onSelect, }) => {
    const handleSelect = useCallback(() => {
        onSelect(member);
    }, [member, onSelect]);
    return (_jsx("div", { className: styles.memberItemStyle, onClick: handleSelect, children: _jsxs("div", { className: styles.memberContainerStyle, children: [_jsx(Avatar, { url: member.avatarUrl || '', name: member.name || '', size: 36 }, member.id), _jsxs("div", { className: styles.memberInfoStyle, children: [_jsx("div", { className: styles.memberNameStyle, children: member.name }), _jsx("div", { className: styles.memberEmailStyle, children: member.email })] })] }) }));
};
//# sourceMappingURL=member-item.js.map