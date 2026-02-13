import React, { type SVGAttributes } from 'react';
import type { To } from 'react-router-dom';
export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactElement<SVGAttributes<SVGElement>>;
    active?: boolean;
    disabled?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    postfix?: React.ReactElement;
    postfixDisplay?: 'always' | 'hover';
}
export interface MenuLinkItemProps extends MenuItemProps {
    to: To;
    linkComponent?: React.ComponentType<{
        to: To;
        className?: string;
    }>;
}
/**
 * This component is not a generic component.
 * It is used for the app sidebar.
 */
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const MenuLinkItem: React.ForwardRefExoticComponent<MenuLinkItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=index.d.ts.map