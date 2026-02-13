import { type CSSProperties, type HTMLProps, type ReactNode } from 'react';
export interface SettingGroupProps extends Omit<HTMLProps<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    contentClassName?: string;
    contentStyle?: CSSProperties;
}
export declare const SettingGroup: import("react").ForwardRefExoticComponent<Omit<SettingGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=group.d.ts.map