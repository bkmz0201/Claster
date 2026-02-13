import { type ReactNode } from 'react';
export interface GenericSelectorProps {
    title?: ReactNode;
    onBack?: () => void;
    onConfirm?: (ids: string[]) => void;
    confirmText?: string;
    initial: string[];
    data: Array<{
        id: string;
        icon: ReactNode;
        label: ReactNode;
    }>;
    typeName: string;
    onBeforeConfirm?: (ids: string[], cb: () => void) => void;
}
export declare const GenericSelector: ({ initial: originalInitial, data, title, confirmText, typeName, onBack, onConfirm, onBeforeConfirm, }: GenericSelectorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=generic-selector.d.ts.map