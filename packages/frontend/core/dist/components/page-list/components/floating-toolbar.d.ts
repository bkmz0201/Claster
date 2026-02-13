import type { CSSProperties, HTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
interface FloatingToolbarProps {
    className?: string;
    style?: CSSProperties;
    open?: boolean;
}
interface FloatingToolbarButtonProps extends HTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    onClick: MouseEventHandler;
    type?: 'danger' | 'default';
    label?: ReactNode;
}
interface FloatingToolbarItemProps {
}
export declare function FloatingToolbar({ children, style, className, open, }: PropsWithChildren<FloatingToolbarProps>): import("react/jsx-runtime").JSX.Element;
export declare namespace FloatingToolbar {
    var Item: typeof FloatingToolbarItem;
    var Separator: typeof FloatingToolbarSeparator;
    var Button: typeof FloatingToolbarButton;
}
export declare function FloatingToolbarItem({ children, }: PropsWithChildren<FloatingToolbarItemProps>): import("react/jsx-runtime").JSX.Element;
export declare function FloatingToolbarButton({ icon, type, onClick, className, style, label, ...props }: FloatingToolbarButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function FloatingToolbarSeparator(): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=floating-toolbar.d.ts.map