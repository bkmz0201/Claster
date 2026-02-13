import { Store } from '@toeverything/infra';
import type { GlobalState } from '../../storage';
import type { AuthSessionInfo } from '../entities/session';
import type { AuthProvider } from '../provider/auth';
import type { FetchService } from '../services/fetch';
import type { GraphQLService } from '../services/graphql';
import type { ServerService } from '../services/server';
export interface AccountProfile {
    id: string;
    email: string;
    name: string;
    hasPassword: boolean;
    avatarUrl: string | null;
    emailVerified: string | null;
}
export declare class AuthStore extends Store {
    private readonly fetchService;
    private readonly gqlService;
    private readonly globalState;
    private readonly serverService;
    private readonly authProvider;
    constructor(fetchService: FetchService, gqlService: GraphQLService, globalState: GlobalState, serverService: ServerService, authProvider: AuthProvider);
    watchCachedAuthSession(): import("rxjs").Observable<AuthSessionInfo | undefined>;
    getCachedAuthSession(): AuthSessionInfo | undefined;
    setCachedAuthSession(session: AuthSessionInfo | null): void;
    getClientNonce(): string | undefined;
    setClientNonce(nonce: string): void;
    fetchSession(): Promise<{
        user?: AccountProfile | null;
    }>;
    signInMagicLink(email: string, token: string): Promise<void>;
    signInOauth(code: string, state: string, provider: string): Promise<{
        redirectUri?: string;
    }>;
    signInPassword(credential: {
        email: string;
        password: string;
        verifyToken?: string;
        challenge?: string;
    }): Promise<void>;
    signOut(): Promise<void>;
    uploadAvatar(file: File): Promise<void>;
    removeAvatar(): Promise<void>;
    updateLabel(label: string): Promise<void>;
    checkUserByEmail(email: string): Promise<{
        registered: boolean;
        hasPassword: boolean;
        magicLink: boolean;
    }>;
    deleteAccount(): Promise<{
        __typename?: "DeleteAccount";
        success: boolean;
    }>;
}
//# sourceMappingURL=auth.d.ts.map