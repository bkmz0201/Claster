import type { InviteLink, WorkspaceInviteLinkExpireTime } from '@affine/graphql';
export type InviteMethodType = 'email' | 'link';
export declare const ModalContent: ({ inviteEmail, setInviteEmail, inviteMethod, onInviteMethodChange, handleConfirm, isMutating, isValidEmail, copyTextToClipboard, onGenerateInviteLink, onRevokeInviteLink, importCSV, invitationLink, }: {
    inviteEmail: string;
    importCSV: React.ReactNode;
    invitationLink: InviteLink | null;
    setInviteEmail: (value: string) => void;
    inviteMethod: InviteMethodType;
    onInviteMethodChange: (value: InviteMethodType) => void;
    handleConfirm: () => void;
    isMutating: boolean;
    isValidEmail: boolean;
    copyTextToClipboard: (text: string) => Promise<boolean>;
    onGenerateInviteLink: (expireTime: WorkspaceInviteLinkExpireTime) => Promise<string>;
    onRevokeInviteLink: () => Promise<boolean>;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=modal-content.d.ts.map