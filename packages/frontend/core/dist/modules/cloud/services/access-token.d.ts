import { LiveData, Service } from '@toeverything/infra';
import type { AccessTokenStore } from '../stores/access-token';
export declare class AccessTokenService extends Service {
    private readonly accessTokenStore;
    constructor(accessTokenStore: AccessTokenStore);
    accessTokens$: LiveData<{
        __typename?: "RevealedAccessToken";
        id: string;
        name: string;
        createdAt: string;
        expiresAt: string | null;
        token: string;
    }[] | null>;
    isRevalidating$: LiveData<boolean>;
    error$: LiveData<any>;
    generateUserAccessToken(name: string): Promise<void>;
    revokeUserAccessToken(id: string): Promise<void>;
    revalidate: import("@toeverything/infra").Effect<unknown>;
    private onAccountChanged;
    waitForRevalidation(signal?: AbortSignal): Promise<void>;
}
//# sourceMappingURL=access-token.d.ts.map