import type { HTMLAttributes } from 'react';
interface InlineMemberListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    members: string[];
    focusedIndex?: number;
    onRemove?: (id: string) => void;
}
export declare const InlineMemberList: ({ className, children, members, focusedIndex, onRemove, ...props }: InlineMemberListProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=inline-member-list.d.ts.map