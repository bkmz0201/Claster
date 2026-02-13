import { type CSSProperties, type HTMLProps, type ReactNode } from 'react';
interface ConfigModalProps {
    onBack?: () => void;
    onDone?: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: ReactNode;
    children: ReactNode;
    variant?: 'popup' | 'page';
}
/**
 * A modal with a page header for configuring something on mobile (preferable to be fullscreen)
 */
export declare const ConfigModal: {
    ({ onBack, onDone, open, onOpenChange, title, children, variant, }: ConfigModalProps): import("react/jsx-runtime").JSX.Element;
    RowGroup: import("react").ForwardRefExoticComponent<Omit<SettingGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Row: import("react").ForwardRefExoticComponent<Omit<HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
export declare const ConfigRow: import("react").ForwardRefExoticComponent<Omit<HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export interface SettingGroupProps extends Omit<HTMLProps<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    contentClassName?: string;
    contentStyle?: CSSProperties;
}
export declare const ConfigRowGroup: import("react").ForwardRefExoticComponent<Omit<SettingGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=index.d.ts.map