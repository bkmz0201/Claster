import { deleteAccountMutation, removeAvatarMutation, updateUserProfileMutation, uploadAvatarMutation, } from '@affine/graphql';
import { Store } from '@toeverything/infra';
export class AuthStore extends Store {
    constructor(fetchService, gqlService, globalState, serverService, authProvider) {
        super();
        this.fetchService = fetchService;
        this.gqlService = gqlService;
        this.globalState = globalState;
        this.serverService = serverService;
        this.authProvider = authProvider;
    }
    watchCachedAuthSession() {
        return this.globalState.watch(`${this.serverService.server.id}-auth`);
    }
    getCachedAuthSession() {
        return this.globalState.get(`${this.serverService.server.id}-auth`);
    }
    setCachedAuthSession(session) {
        this.globalState.set(`${this.serverService.server.id}-auth`, session);
    }
    getClientNonce() {
        return this.globalState.get('auth-client-nonce');
    }
    setClientNonce(nonce) {
        this.globalState.set('auth-client-nonce', nonce);
    }
    async fetchSession() {
        const url = `/api/auth/session`;
        const options = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await this.fetchService.fetch(url, options);
        const data = (await res.json());
        if (!res.ok)
            throw new Error('Get session fetch error: ' + JSON.stringify(data));
        return data; // Return null if data empty
    }
    async signInMagicLink(email, token) {
        await this.authProvider.signInMagicLink(email, token, this.getClientNonce());
    }
    async signInOauth(code, state, provider) {
        return await this.authProvider.signInOauth(code, state, provider, this.getClientNonce());
    }
    async signInPassword(credential) {
        await this.authProvider.signInPassword(credential);
    }
    async signOut() {
        await this.authProvider.signOut();
    }
    async uploadAvatar(file) {
        await this.gqlService.gql({
            query: uploadAvatarMutation,
            variables: {
                avatar: file,
            },
        });
    }
    async removeAvatar() {
        await this.gqlService.gql({
            query: removeAvatarMutation,
        });
    }
    async updateLabel(label) {
        await this.gqlService.gql({
            query: updateUserProfileMutation,
            variables: {
                input: {
                    name: label,
                },
            },
        });
    }
    async checkUserByEmail(email) {
        const res = await this.fetchService.fetch('/api/auth/preflight', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'content-type': 'application/json',
            },
        });
        if (!res.ok) {
            throw new Error(`Failed to check user by email: ${email}`);
        }
        const data = (await res.json());
        return data;
    }
    async deleteAccount() {
        const res = await this.gqlService.gql({
            query: deleteAccountMutation,
        });
        return res.deleteAccount;
    }
}
//# sourceMappingURL=auth.js.map