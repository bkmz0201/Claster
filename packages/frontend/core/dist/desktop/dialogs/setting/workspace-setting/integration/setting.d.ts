import type { HTMLAttributes, ReactNode } from 'react';
export declare const IntegrationSettingHeader: ({ icon, name, desc, action, divider, }: {
    icon: ReactNode;
    name: string;
    desc: string;
    action?: ReactNode;
    divider?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export interface IntegrationSettingItemProps extends HTMLAttributes<HTMLDivElement> {
    name?: ReactNode;
    desc?: ReactNode;
}
export declare const IntegrationSettingItem: ({ name, desc, children, className, ...props }: IntegrationSettingItemProps) => import("react/jsx-runtime").JSX.Element;
export interface IntegrationSettingToggleProps {
    name: string;
    desc?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}
export declare const IntegrationSettingToggle: ({ name, desc, checked, onChange, }: IntegrationSettingToggleProps) => import("react/jsx-runtime").JSX.Element;
export interface IntegrationSettingTextRadioGroupItem {
    name: string;
    desc?: string;
    value: any;
}
export interface IntegrationSettingTextRadioGroupProps {
    items: IntegrationSettingTextRadioGroupItem[];
    checked: any;
    onChange: (value: any) => void;
}
export declare const IntegrationSettingTextRadioGroup: ({ items, checked, onChange, }: IntegrationSettingTextRadioGroupProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=setting.d.ts.map