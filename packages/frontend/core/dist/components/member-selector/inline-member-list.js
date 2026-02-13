import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { MemberItem } from './item';
import * as styles from './styles.css';
export const InlineMemberList = ({ className, children, members, focusedIndex, onRemove, ...props }) => {
    return (_jsxs("div", { className: clsx(styles.inlineMemberList, className), ...props, children: [members.map((member, idx) => (_jsx(MemberItem, { userId: member, focused: focusedIndex === idx, onRemove: onRemove ? () => onRemove(member) : undefined }, member))), children] }));
};
//# sourceMappingURL=inline-member-list.js.map