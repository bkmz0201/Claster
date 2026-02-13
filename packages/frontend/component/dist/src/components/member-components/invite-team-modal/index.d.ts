import type { InviteLink, WorkspaceInviteLinkExpireTime } from '@affine/graphql';
export interface InviteTeamMemberModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onConfirm: (params: {
        emails: string[];
    }) => void;
    isMutating: boolean;
    copyTextToClipboard: (text: string) => Promise<boolean>;
    onGenerateInviteLink: (expireTime: WorkspaceInviteLinkExpireTime) => Promise<string>;
    onRevokeInviteLink: () => Promise<boolean>;
    importCSV: React.ReactNode;
    invitationLink: InviteLink | null;
}
export declare const InviteTeamMemberModal: ({ open, setOpen, onConfirm, isMutating, copyTextToClipboard, onGenerateInviteLink, onRevokeInviteLink, importCSV, invitationLink, }: InviteTeamMemberModalProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map