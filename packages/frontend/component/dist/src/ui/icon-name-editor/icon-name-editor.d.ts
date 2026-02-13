import { type ReactNode } from 'react';
import { type ButtonProps } from '../button';
import { type IconData } from '../icon-picker';
import { type MenuProps } from '../menu';
export interface IconEditorProps {
    icon?: IconData;
    closeAfterSelect?: boolean;
    iconPlaceholder?: ReactNode;
    onIconChange?: (data?: IconData) => void;
    triggerClassName?: string;
}
export interface IconAndNameEditorContentProps extends IconEditorProps {
    name: string;
    namePlaceholder?: string;
    onNameChange?: (name: string) => void;
    onEnter?: () => void;
    inputTestId?: string;
}
export interface IconAndNameEditorMenuProps extends Omit<MenuProps, 'items'>, IconAndNameEditorContentProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    width?: string | number;
    skipIfNotChanged?: boolean;
}
export declare const IconEditor: ({ icon, closeAfterSelect, iconPlaceholder, triggerClassName, onIconChange, alignOffset, sideOffset, triggerVariant, }: IconEditorProps & {
    alignOffset?: number;
    sideOffset?: number;
    triggerVariant?: ButtonProps["variant"];
}) => import("react/jsx-runtime").JSX.Element;
export declare const IconAndNameEditorContent: ({ name, namePlaceholder, inputTestId, onNameChange, onEnter, ...iconEditorProps }: IconAndNameEditorContentProps) => import("react/jsx-runtime").JSX.Element;
export declare const IconAndNameEditorMenu: ({ open, onOpenChange, width, icon: initialIcon, name: initialName, onIconChange, onNameChange, contentOptions, iconPlaceholder, skipIfNotChanged, inputTestId, closeAfterSelect, ...menuProps }: IconAndNameEditorMenuProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=icon-name-editor.d.ts.map