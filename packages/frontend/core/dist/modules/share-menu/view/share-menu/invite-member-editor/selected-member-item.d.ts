import type { Member } from '@affine/core/modules/permissions';
export interface TagItemProps {
    member: Member;
    idx?: number;
    onRemoved?: () => void;
    style?: React.CSSProperties;
}
export declare const SelectedMemberItem: ({ member, idx, onRemoved, style, }: TagItemProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=selected-member-item.d.ts.map