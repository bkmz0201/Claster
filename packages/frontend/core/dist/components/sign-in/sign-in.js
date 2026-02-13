import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, notify } from '@affine/component';
import { AuthContainer, AuthContent, AuthFooter, AuthHeader, AuthInput, } from '@affine/component/auth-components';
import { OAuth } from '@affine/core/components/affine/auth/oauth';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AuthService, ServerService } from '@affine/core/modules/cloud';
import { ServerDeploymentType } from '@affine/graphql';
import { Trans, useI18n } from '@affine/i18n';
import { ArrowRightBigIcon, LocalWorkspaceIcon, PublishIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVar } from '@toeverything/theme';
import { useCallback, useEffect, useState, } from 'react';
import { useSelfhostLoginVersionGuard } from '../hooks/affine/use-selfhost-login-version-guard';
import { Back } from './back';
import * as style from './style.css';
const emailRegex = /^(?:(?:[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?:(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((?:[a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validateEmail(email) {
    return emailRegex.test(email);
}
export const SignInStep = ({ state, changeState, onSkip, onAuthenticated, }) => {
    const t = useI18n();
    const serverService = useService(ServerService);
    const serverName = useLiveData(serverService.server.config$.selector(c => c.serverName));
    const versionError = useSelfhostLoginVersionGuard(serverService.server);
    const isSelfhosted = useLiveData(serverService.server.config$.selector(c => c.type === ServerDeploymentType.Selfhosted));
    const authService = useService(AuthService);
    const [isMutating, setIsMutating] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const loginStatus = useLiveData(authService.session.status$);
    useEffect(() => {
        if (loginStatus === 'authenticated') {
            notify.success({
                title: t['com.affine.auth.toast.title.signed-in'](),
                message: t['com.affine.auth.toast.message.signed-in'](),
            });
        }
        onAuthenticated?.(loginStatus);
    }, [loginStatus, onAuthenticated, t]);
    const onContinue = useAsyncCallback(async () => {
        if (!validateEmail(email)) {
            setIsValidEmail(false);
            return;
        }
        setIsValidEmail(true);
        setIsMutating(true);
        try {
            const { hasPassword } = await authService.checkUserByEmail(email);
            if (hasPassword) {
                changeState(prev => ({
                    ...prev,
                    email,
                    step: 'signInWithPassword',
                    hasPassword: true,
                }));
            }
            else {
                changeState(prev => ({
                    ...prev,
                    email,
                    step: 'signInWithEmail',
                    hasPassword: false,
                }));
            }
        }
        catch (err) {
            console.error(err);
            // TODO(@eyhn): better error handling
            notify.error({
                title: 'Failed to sign in',
                message: err.message,
            });
        }
        setIsMutating(false);
    }, [authService, changeState, email]);
    const onAddSelfhosted = useCallback(() => {
        changeState(prev => ({
            ...prev,
            step: 'addSelfhosted',
        }));
    }, [changeState]);
    if (versionError && isSelfhosted) {
        return (_jsxs(AuthContainer, { children: [_jsx(AuthHeader, { title: t['com.affine.auth.sign.in'](), subTitle: serverName }), _jsx(AuthContent, { children: _jsx("div", { children: versionError }) })] }));
    }
    return (_jsxs(AuthContainer, { children: [_jsx(AuthHeader, { title: t['com.affine.auth.sign.in'](), subTitle: serverName }), _jsxs(AuthContent, { children: [_jsx(OAuth, { redirectUrl: state.redirectUrl }), _jsx(AuthInput, { className: style.authInput, label: t['com.affine.settings.email'](), placeholder: t['com.affine.auth.sign.email.placeholder'](), onChange: setEmail, error: !isValidEmail, errorHint: isValidEmail ? '' : t['com.affine.auth.sign.email.error'](), onEnter: onContinue }), _jsx(Button, { className: style.signInButton, style: { width: '100%' }, size: "extraLarge", "data-testid": "continue-login-button", block: true, loading: isMutating, suffix: _jsx(ArrowRightBigIcon, {}), suffixStyle: { width: 20, height: 20, color: cssVar('blue') }, onClick: onContinue, children: t['com.affine.auth.sign.email.continue']() }), !isSelfhosted && (_jsxs(_Fragment, { children: [_jsx("div", { className: style.authMessage, children: _jsxs(Trans, { i18nKey: "com.affine.auth.sign.message", children: ["By clicking \"Continue with Google/Email\" above, you acknowledge that you agree to AFFiNE's ", _jsx("a", { href: "https://affine.pro/terms", target: "_blank", rel: "noreferrer", children: "Terms of Conditions" }), " and ", _jsx("a", { href: "https://affine.pro/privacy", target: "_blank", rel: "noreferrer", children: "Privacy Policy" }), "."] }) }), _jsxs("div", { className: style.skipDivider, children: [_jsx("div", { className: style.skipDividerLine }), _jsx("span", { className: style.skipDividerText, children: "or" }), _jsx("div", { className: style.skipDividerLine })] }), _jsxs("div", { className: style.skipSection, children: [BUILD_CONFIG.isNative ? (_jsx(Button, { variant: "plain", className: style.addSelfhostedButton, prefix: _jsx(PublishIcon, { className: style.addSelfhostedButtonPrefix }), onClick: onAddSelfhosted, children: t['com.affine.auth.sign.add-selfhosted']() })) : (_jsx("div", { className: style.skipText, children: t['com.affine.mobile.sign-in.skip.hint']() })), _jsx(Button, { variant: "plain", onClick: onSkip, className: style.skipLink, prefix: _jsx(LocalWorkspaceIcon, { className: style.skipLinkIcon }), children: t['com.affine.mobile.sign-in.skip.link']() })] })] }))] }), isSelfhosted && (_jsx(AuthFooter, { children: _jsx(Back, { changeState: changeState }) }))] }));
};
//# sourceMappingURL=sign-in.js.map