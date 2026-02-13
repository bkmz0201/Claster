import { AuthProvider } from '../provider/auth';
import { ServerScope } from '../scopes/server';
import { FetchService } from '../services/fetch';
export function configureDefaultAuthProvider(framework) {
    framework.scope(ServerScope).override(AuthProvider, resolver => {
        const fetchService = resolver.get(FetchService);
        return {
            async signInMagicLink(email, token, clientNonce) {
                await fetchService.fetch('/api/auth/magic-link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, token, client_nonce: clientNonce }),
                });
            },
            async signInOauth(code, state, _provider, clientNonce) {
                const res = await fetchService.fetch('/api/oauth/callback', {
                    method: 'POST',
                    body: JSON.stringify({ code, state, client_nonce: clientNonce }),
                    headers: {
                        'content-type': 'application/json',
                    },
                });
                return await res.json();
            },
            async signInPassword(credential) {
                const headers = {};
                if (credential.verifyToken) {
                    headers['x-captcha-token'] = credential.verifyToken;
                }
                if (credential.challenge) {
                    headers['x-captcha-challenge'] = credential.challenge;
                }
                await fetchService.fetch('/api/auth/sign-in', {
                    method: 'POST',
                    body: JSON.stringify(credential),
                    headers: {
                        'content-type': 'application/json',
                        ...headers,
                    },
                });
            },
            async signOut() {
                await fetchService.fetch('/api/auth/sign-out');
            },
        };
    });
}
//# sourceMappingURL=auth.js.map