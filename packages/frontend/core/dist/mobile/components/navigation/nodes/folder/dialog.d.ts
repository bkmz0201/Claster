import type { RenameDialogProps, RenameSubMenuProps } from '../../../rename';
export declare const FolderCreateTip: ({ input, parentName, }: {
    input?: string;
    parentName?: string;
}) => string;
export declare const FolderRenameSubMenu: ({ title: propsTitle, icon: propsIcon, text: propsText, ...props }: RenameSubMenuProps) => import("react/jsx-runtime").JSX.Element;
export declare const FolderRenameDialog: ({ title: propsTitle, confirmText: propsConfirmText, ...props }: RenameDialogProps & {
    open?: boolean;
    onOpenChange?: (v: boolean) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=dialog.d.ts.map