import type { OAuthProviderType } from '@affine/graphql';
import { Service } from '@toeverything/infra';
import type { GlobalDialogService } from '../../dialogs';
import type { UrlService } from '../../url';
import { AuthSession } from '../entities/session';
import type { AuthStore } from '../stores/auth';
import type { FetchService } from './fetch';
export declare class AuthService extends Service {
    private readonly fetchService;
    private readonly store;
    private readonly urlService;
    private readonly dialogService;
    session: AuthSession;
    constructor(fetchService: FetchService, store: AuthStore, urlService: UrlService, dialogService: GlobalDialogService);
    private onServerStarted;
    private onApplicationFocused;
    sendEmailMagicLink(email: string, verifyToken?: string, challenge?: string, redirectUrl?: string): Promise<void>;
    signInMagicLink(email: string, token: string, byLink?: boolean): Promise<void>;
    oauthPreflight(provider: OAuthProviderType, client: string, 
    /** @deprecated*/ redirectUrl?: string): Promise<Record<string, string>>;
    signInOauth(code: string, state: string, provider: string): Promise<{
        redirectUri: string | undefined;
    }>;
    signInPassword(credential: {
        email: string;
        password: string;
        verifyToken?: string;
        challenge?: string;
    }): Promise<void>;
    signOut(): Promise<void>;
    deleteAccount(): Promise<{
        __typename?: "DeleteAccount";
        success: boolean;
    }>;
    checkUserByEmail(email: string): Promise<{
        registered: boolean;
        hasPassword: boolean;
        magicLink: boolean;
    }>;
    captchaHeaders(token: string, challenge?: string): Record<string, string>;
    private setClientNonce;
}
//# sourceMappingURL=auth.d.ts.map