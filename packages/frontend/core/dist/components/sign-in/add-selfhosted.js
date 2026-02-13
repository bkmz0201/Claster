import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthContainer, AuthContent, AuthFooter, AuthHeader, AuthInput, } from '@affine/component/auth-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { ServersService } from '@affine/core/modules/cloud';
import { Trans, useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState, } from 'react';
import { Back } from './back';
import * as styles from './style.css';
function normalizeURL(url) {
    const normalized = new URL(url).toString();
    return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
}
export const AddSelfhostedStep = ({ state, changeState, }) => {
    const serversService = useService(ServersService);
    const [baseURL, setBaseURL] = useState(state.initialServerBaseUrl ?? '');
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(false);
    const t = useI18n();
    const urlValid = useMemo(() => {
        try {
            normalizeURL(baseURL);
            return true;
        }
        catch {
            return false;
        }
    }, [baseURL]);
    const onBaseURLChange = useCallback((value) => {
        setBaseURL(value);
        setError(false);
    }, []);
    const onConnect = useAsyncCallback(async () => {
        setIsConnecting(true);
        try {
            const server = await serversService.addOrGetServerByBaseUrl(normalizeURL(baseURL));
            changeState(prev => ({
                ...prev,
                step: 'signIn',
                server,
            }));
        }
        catch (err) {
            console.error(err);
            setError(true);
        }
        setIsConnecting(false);
    }, [baseURL, changeState, serversService]);
    useEffect(() => {
        if (state.initialServerBaseUrl) {
            changeState(prev => ({
                ...prev,
                initialServerBaseUrl: undefined,
            }));
            if (serversService.getServerByBaseUrl(state.initialServerBaseUrl)) {
                onConnect();
            }
        }
    }, [changeState, onConnect, serversService, state]);
    return (_jsxs(AuthContainer, { children: [_jsx(AuthHeader, { title: t['com.affine.auth.sign.add-selfhosted.title'](), subTitle: t['com.affine.auth.sign.add-selfhosted']() }), _jsxs(AuthContent, { children: [_jsx(AuthInput, { label: t['com.affine.auth.sign.add-selfhosted.baseurl'](), value: baseURL, onChange: onBaseURLChange, placeholder: "https://your-server.com", error: !!error, disabled: isConnecting, errorHint: t['com.affine.auth.sign.add-selfhosted.error'](), onEnter: onConnect }), _jsx(Button, { "data-testid": "connect-selfhosted-button", variant: "primary", size: "extraLarge", style: { width: '100%', marginTop: '16px' }, disabled: !urlValid || isConnecting, loading: isConnecting, onClick: onConnect, children: t['com.affine.auth.sign.add-selfhosted.connect-button']() })] }), _jsxs(AuthFooter, { children: [_jsx("div", { className: styles.authMessage, children: _jsx(Trans, { i18nKey: "com.affine.auth.sign.add-selfhosted.description", components: {
                                1: (_jsx("a", { href: "https://docs.affine.pro/docs/self-host-affine", target: "_blank", rel: "noreferrer" })),
                            } }) }), _jsx(Back, { changeState: changeState })] })] }));
};
//# sourceMappingURL=add-selfhosted.js.map