import { type HTMLAttributes } from 'react';
export interface AddItemPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
    onClick?: () => void;
    label?: string;
    icon?: React.ReactNode;
}
export declare const AddItemPlaceholder: ({ onClick, label, icon, className, ...attrs }: AddItemPlaceholderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=add-item-placeholder.d.ts.map