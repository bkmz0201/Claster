import { type User } from '@affine/component/auth-components';
import { type GetInviteInfoQuery } from '@affine/graphql';
export declare const RequestToJoinPage: ({ user, inviteInfo, requestToJoin, onSignOut, }: {
    user: User | null;
    inviteInfo?: GetInviteInfoQuery["getInviteInfo"];
    requestToJoin: () => void;
    onSignOut: () => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=request-to-join-page.d.ts.map