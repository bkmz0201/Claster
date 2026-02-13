export * from './menu.types';
import { ContextMenu } from './desktop/context-menu';
import { DesktopMenuItem } from './desktop/item';
import { DesktopMenu } from './desktop/root';
import { DesktopMenuSeparator } from './desktop/separator';
import { DesktopMenuSub } from './desktop/sub';
import { MenuTrigger } from './menu-trigger';
import { MobileMenuItem } from './mobile/item';
import { MobileMenu } from './mobile/root';
import { MobileMenuSeparator } from './mobile/separator';
import { MobileMenuSub } from './mobile/sub';
declare const MenuItem: (props: import("./menu.types").MenuItemProps) => import("react/jsx-runtime").JSX.Element | null;
declare const MenuSeparator: ({ className, ...otherProps }: import("@radix-ui/react-dropdown-menu").DropdownMenuSeparatorProps) => import("react/jsx-runtime").JSX.Element;
declare const MenuSub: ({ title, children: propsChildren, items, triggerOptions, subContentOptions: contentOptions, }: import("./menu.types").MenuSubProps & {
    title?: string;
}) => import("react/jsx-runtime").JSX.Element;
declare const Menu: ({ children, items, noPortal, portalOptions, rootOptions: { defaultOpen, modal, open, onOpenChange, onClose, ...rootOptions }, contentOptions: { className, style: contentStyle, ...otherContentOptions }, ref, }: import("./menu.types").MenuProps) => import("react/jsx-runtime").JSX.Element;
export { ContextMenu, DesktopMenu, DesktopMenuItem, DesktopMenuSeparator, DesktopMenuSub, MobileMenu, MobileMenuItem, MobileMenuSeparator, MobileMenuSub, };
export { Menu, MenuItem, MenuSeparator, MenuSub, MenuTrigger };
export * from './mobile/hook';
//# sourceMappingURL=index.d.ts.map