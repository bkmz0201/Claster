import { useService } from '@toeverything/infra';
import { useEffect, useRef } from 'react';
import { redirect, useLoaderData, useNavigate, } from 'react-router-dom';
import { AuthService } from '../../../modules/cloud';
import { supportedClient } from './common';
export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const queries = url.searchParams;
    const code = queries.get('code');
    let stateStr = queries.get('state') ?? '{}';
    if (!code || !stateStr) {
        return redirect('/sign-in?error=Invalid oauth callback parameters');
    }
    try {
        const { state, client, provider } = JSON.parse(stateStr);
        stateStr = state;
        const payload = {
            state,
            code,
            provider,
        };
        if (!client || client === 'web') {
            return payload;
        }
        const clientCheckResult = supportedClient.safeParse(client);
        if (!clientCheckResult.success) {
            return redirect('/sign-in?error=Invalid oauth callback parameters');
        }
        const authParams = new URLSearchParams();
        authParams.set('method', 'oauth');
        authParams.set('payload', JSON.stringify(payload));
        authParams.set('server', location.origin);
        return redirect(`/open-app/url?url=${encodeURIComponent(`${client}://authentication?${authParams.toString()}`)}`);
    }
    catch {
        return redirect('/sign-in?error=Invalid oauth callback parameters');
    }
};
export const Component = () => {
    const auth = useService(AuthService);
    const data = useLoaderData();
    // loader data from useLoaderData is not reactive, so that we can safely
    // assume the effect below is only triggered once
    const triggeredRef = useRef(false);
    const nav = useNavigate();
    useEffect(() => {
        if (triggeredRef.current) {
            return;
        }
        triggeredRef.current = true;
        auth
            .signInOauth(data.code, data.state, data.provider)
            .then(() => {
            window.close();
        })
            .catch(e => {
            nav(`/sign-in?error=${encodeURIComponent(e.message)}`);
        });
    }, [data, auth, nav]);
    return null;
};
//# sourceMappingURL=oauth-callback.js.map