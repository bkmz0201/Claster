import { type PropsWithChildren } from 'react';
export type CategoryDividerProps = PropsWithChildren<{
    label: string;
    className?: string;
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
} & {
    [key: `data-${string}`]: unknown;
}>;
export declare const CategoryDivider: import("react").ForwardRefExoticComponent<{
    label: string;
    className?: string;
    collapsed?: boolean;
    setCollapsed?: (collapsed: boolean) => void;
} & {
    [key: `data-${string}`]: unknown;
} & {
    children?: import("react").ReactNode | undefined;
} & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=index.d.ts.map