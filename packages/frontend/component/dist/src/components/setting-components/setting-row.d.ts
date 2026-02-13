import type { CSSProperties, PropsWithChildren, ReactNode } from 'react';
export type SettingRowProps = PropsWithChildren<{
    name: ReactNode;
    desc?: ReactNode;
    style?: CSSProperties;
    onClick?: () => void;
    spreadCol?: boolean;
    'data-testid'?: string;
    disabled?: boolean;
    className?: string;
}>;
export declare const SettingRow: ({ name, desc, children, onClick, style, spreadCol, disabled, className, ...props }: PropsWithChildren<SettingRowProps>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=setting-row.d.ts.map