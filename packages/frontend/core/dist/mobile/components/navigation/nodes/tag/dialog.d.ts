import { type MenuSubProps } from '@affine/component';
import { type ReactNode } from 'react';
import type { RenameContentProps } from '../../../rename/type';
interface TagRenameContentProps extends Omit<RenameContentProps, 'onConfirm'> {
    initialColor?: string;
    onConfirm?: (name: string, color: string) => void;
    enableAnimation?: boolean;
}
interface TagRenameDialogProps extends TagRenameContentProps {
    title?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare const TagRenameDialog: ({ title: propsTitle, confirmText: propsConfirmText, open, onOpenChange, ...props }: TagRenameDialogProps) => import("react/jsx-runtime").JSX.Element;
interface TagRenameSubMenuProps {
    tagId?: string;
    title?: string;
    icon?: ReactNode;
    text?: string;
    onConfirm?: (name: string, color: string) => void;
    menuProps?: Partial<MenuSubProps>;
}
export declare const TagRenameSubMenu: ({ tagId, title, icon, text, menuProps, onConfirm, }: TagRenameSubMenuProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=dialog.d.ts.map