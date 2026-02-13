import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { type HTMLProps, type ReactNode } from 'react';
export declare const PropertyCollapsibleSection: import("react").ForwardRefExoticComponent<Omit<{
    defaultCollapsed?: boolean;
    icon?: ReactNode;
    title: ReactNode;
    suffix?: ReactNode;
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
} & {
    children?: ReactNode | undefined;
} & Omit<HTMLProps<HTMLDivElement>, "title">, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const PropertyCollapsibleContent: import("react").ForwardRefExoticComponent<Omit<{
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
    collapseButtonText?: (option: {
        total: number;
        hide: number;
        isCollapsed: boolean;
    }) => ReactNode;
} & {
    children?: ReactNode | undefined;
} & HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const PropertyRoot: import("react").ForwardRefExoticComponent<Omit<{
    dropIndicatorEdge?: Edge | null;
    hideEmpty?: boolean;
    hide?: boolean;
} & HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const PropertyName: ({ icon, name, className, menuItems, defaultOpenMenu, ...props }: {
    icon?: ReactNode;
    name?: ReactNode;
    menuItems?: ReactNode;
    defaultOpenMenu?: boolean;
} & Omit<HTMLProps<HTMLDivElement>, "name">) => import("react/jsx-runtime").JSX.Element;
export declare const PropertyValue: import("react").ForwardRefExoticComponent<Omit<{
    readonly?: boolean;
    isEmpty?: boolean;
    hoverable?: boolean;
} & HTMLProps<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=property.d.ts.map