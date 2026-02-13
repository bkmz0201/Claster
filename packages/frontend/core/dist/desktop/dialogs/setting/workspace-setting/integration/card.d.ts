import type { HTMLAttributes, ReactNode } from 'react';
export declare const IntegrationCard: ({ className, link, ...props }: HTMLAttributes<HTMLElement> & {
    link?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const IntegrationCardIcon: ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => import("react/jsx-runtime").JSX.Element;
export declare const IntegrationCardHeader: ({ className, icon, title, status, ...props }: HTMLAttributes<HTMLHeadElement> & {
    icon?: ReactNode;
    title?: string;
    status?: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const IntegrationCardContent: ({ className, desc, ...props }: HTMLAttributes<HTMLDivElement> & {
    desc?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const IntegrationCardFooter: ({ className, ...props }: HTMLAttributes<HTMLElement>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=card.d.ts.map