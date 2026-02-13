import { type InviteLink, WorkspaceInviteLinkExpireTime } from '@affine/graphql';
export declare const LinkInvite: ({ invitationLink, copyTextToClipboard, generateInvitationLink, revokeInvitationLink, }: {
    invitationLink: InviteLink | null;
    generateInvitationLink: (expireTime: WorkspaceInviteLinkExpireTime) => Promise<string>;
    revokeInvitationLink: () => Promise<boolean>;
    copyTextToClipboard: (text: string) => Promise<boolean>;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=link-invite.d.ts.map