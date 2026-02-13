import { type MenuProps } from '@affine/component';
interface CommonProps {
    onSelect?: (docId: string) => void;
    asLink?: boolean;
}
interface TemplateListMenuContentProps extends CommonProps {
    prefixItems?: React.ReactNode;
    suffixItems?: React.ReactNode;
}
export declare const TemplateListMenuContent: ({ prefixItems, suffixItems, ...props }: TemplateListMenuContentProps) => import("react/jsx-runtime").JSX.Element;
export declare const TemplateListMenuContentScrollable: (props: TemplateListMenuContentProps) => import("react/jsx-runtime").JSX.Element;
interface TemplateListMenuProps extends TemplateListMenuContentProps, Omit<MenuProps, 'items'> {
}
export declare const TemplateListMenu: ({ children, onSelect, asLink, prefixItems, suffixItems, contentOptions, ...otherProps }: TemplateListMenuProps) => import("react/jsx-runtime").JSX.Element;
export declare const TemplateListMenuAdd: () => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=template-list-menu.d.ts.map