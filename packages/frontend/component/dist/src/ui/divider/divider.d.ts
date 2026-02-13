import type { HTMLAttributes, PropsWithChildren } from 'react';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerProps = PropsWithChildren & Omit<HTMLAttributes<HTMLDivElement>, 'type'> & {
    orientation?: DividerOrientation;
    size?: 'thinner' | 'default';
    space?: number;
    dividerColor?: string;
};
export declare const Divider: import("react").ForwardRefExoticComponent<{
    children?: import("react").ReactNode | undefined;
} & Omit<HTMLAttributes<HTMLDivElement>, "type"> & {
    orientation?: DividerOrientation;
    size?: "thinner" | "default";
    space?: number;
    dividerColor?: string;
} & import("react").RefAttributes<HTMLDivElement>>;
export default Divider;
//# sourceMappingURL=divider.d.ts.map