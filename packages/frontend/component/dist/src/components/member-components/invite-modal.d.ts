import { Permission } from '@affine/graphql';
export interface InviteModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: (params: {
        email: string;
        permission: Permission;
    }) => void;
    isMutating: boolean;
}
export declare const InviteModal: ({ open, setOpen, onConfirm, isMutating, }: InviteModalProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=invite-modal.d.ts.map