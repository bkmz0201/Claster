import { type MenuRef } from '@affine/component';
import type { ReactNode } from 'react';
export interface MemberSelectorProps {
    selected: string[];
    style?: React.CSSProperties;
    className?: string;
    onChange: (selected: string[]) => void;
}
export interface MemberSelectorInlineProps extends MemberSelectorProps {
    modalMenu?: boolean;
    menuClassName?: string;
    readonly?: boolean;
    title?: ReactNode;
    placeholder?: ReactNode;
    ref?: React.Ref<MenuRef>;
    onEditorClose?: () => void;
}
export declare const MemberSelector: ({ selected, className, onChange, style, }: MemberSelectorProps) => import("react/jsx-runtime").JSX.Element;
export declare const MemberSelectorInline: ({ readonly, placeholder, className, title, style, onEditorClose, ref, ...props }: MemberSelectorInlineProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map