import { type PropsWithChildren, type ReactNode } from 'react';
export interface SelectorContentProps extends PropsWithChildren {
    searchPlaceholder?: string;
    selectedCount?: number;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
    actions?: ReactNode;
}
/**
 * Provides a unified layout for doc/collection/tag selector
 * - Header (Search input)
 * - Content
 * - Footer (Selected count + Actions)
 */
export declare const SelectorLayout: ({ children, searchPlaceholder, selectedCount, onSearch, onClear, onCancel, onConfirm, actions, }: SelectorContentProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=selector-layout.d.ts.map