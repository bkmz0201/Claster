import { type PropsWithChildren } from 'react';
export interface TabItemProps extends PropsWithChildren {
    id: string;
    label: string;
    onClick?: (isActive: boolean) => void;
}
export declare const TabItem: ({ id, label, children, onClick }: TabItemProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tab-item.d.ts.map