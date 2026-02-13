import { useService } from '@toeverything/infra';
import { useEffect, useRef } from 'react';
import { redirect, useLoaderData, 
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
useNavigate, } from 'react-router-dom';
import { AuthService } from '../../../modules/cloud';
import { supportedClient } from './common';
export const loader = ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const client = params.get('client');
    const email = params.get('email');
    const token = params.get('token');
    const redirectUri = params.get('redirect_uri');
    if (!email || !token) {
        return redirect('/sign-in?error=Invalid magic link');
    }
    const payload = {
        email,
        token,
        redirectUri,
    };
    if (!client || client === 'web') {
        return payload;
    }
    const clientCheckResult = supportedClient.safeParse(client);
    if (!clientCheckResult.success) {
        return redirect('/sign-in?error=Invalid callback parameters');
    }
    const authParams = new URLSearchParams();
    authParams.set('method', 'magic-link');
    authParams.set('payload', JSON.stringify(payload));
    return redirect(`/open-app/url?url=${encodeURIComponent(`${client}://authentication?${authParams.toString()}`)}`);
};
export const Component = () => {
    // TODO(@eyhn): loading ui
    const auth = useService(AuthService);
    const data = useLoaderData();
    const nav = useNavigate();
    // loader data from useLoaderData is not reactive, so that we can safely
    // assume the effect below is only triggered once
    const triggeredRef = useRef(false);
    useEffect(() => {
        if (triggeredRef.current) {
            return;
        }
        triggeredRef.current = true;
        auth
            .signInMagicLink(data.email, data.token)
            .then(() => {
            const subscription = auth.session.status$.subscribe(status => {
                if (status === 'authenticated') {
                    nav(data.redirectUri ?? '/');
                    subscription?.unsubscribe();
                }
            });
        })
            .catch(e => {
            nav(`/sign-in?error=${encodeURIComponent(e.message)}`);
        });
    }, [auth, data, data.email, data.redirectUri, data.token, nav]);
    return null;
};
//# sourceMappingURL=magic-link.js.map