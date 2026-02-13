import type { HTMLAttributes, ReactNode } from 'react';
interface SettingHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title: ReactNode;
    subtitle?: ReactNode;
    beta?: boolean;
}
export declare const SettingHeader: ({ title, subtitle, beta, ...otherProps }: SettingHeaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=setting-header.d.ts.map