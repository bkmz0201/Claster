import type { MenuItemProps } from './menu.types';
export declare const useMenuItem: <T extends MenuItemProps>({ children: propsChildren, type, className: propsClassName, prefix, prefixIcon, prefixIconClassName, suffix, suffixIcon, suffixIconClassName, checked, selected, block, disabled, ...otherProps }: T) => {
    children: import("react/jsx-runtime").JSX.Element;
    className: string;
    otherProps: Omit<T, "className" | "prefix" | "children" | "block" | "disabled" | "type" | "suffix" | "checked" | "selected" | "prefixIcon" | "suffixIcon" | "prefixIconClassName" | "suffixIconClassName">;
};
//# sourceMappingURL=use-menu-item.d.ts.map