export interface AuthProvider {
    signInMagicLink(email: string, token: string, clientNonce?: string): Promise<void>;
    signInOauth(code: string, state: string, provider: string, clientNonce?: string): Promise<{
        redirectUri?: string;
    }>;
    signInPassword(credential: {
        email: string;
        password: string;
        verifyToken?: string;
        challenge?: string;
    }): Promise<void>;
    signOut(): Promise<void>;
}
export declare const AuthProvider: import("@toeverything/infra").Identifier<AuthProvider> & ((variant: string) => import("@toeverything/infra").Identifier<AuthProvider>);
//# sourceMappingURL=auth.d.ts.map