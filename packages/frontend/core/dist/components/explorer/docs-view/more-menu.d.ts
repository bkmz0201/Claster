import { type IconButtonProps, type MenuProps } from '@affine/component';
interface DocOperationProps {
    docId: string;
}
export declare const MoreMenuContent: (props: DocOperationProps) => import("react/jsx-runtime").JSX.Element;
export declare const MoreMenu: ({ docId, children, contentOptions, ...menuProps }: Omit<MenuProps, "items"> & {
    docId: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const MoreMenuButton: ({ docId, iconProps, ...menuProps }: Omit<MenuProps, "items" | "children"> & {
    docId: string;
    iconProps?: IconButtonProps;
}) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=more-menu.d.ts.map