import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { notify } from '@affine/component';
import { AuthContainer, AuthContent, AuthFooter, AuthHeader, AuthInput, } from '@affine/component/auth-components';
import { Button } from '@affine/component/ui/button';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AuthService, CaptchaService, ServerService, } from '@affine/core/modules/cloud';
import { Unreachable } from '@affine/env/constant';
import { ServerDeploymentType } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';
import { Back } from './back';
import { Captcha } from './captcha';
import * as styles from './style.css';
export const SignInWithPasswordStep = ({ state, changeState, onAuthenticated, }) => {
    const t = useI18n();
    const authService = useService(AuthService);
    const email = state.email;
    if (!email) {
        throw new Unreachable();
    }
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const captchaService = useService(CaptchaService);
    const serverService = useService(ServerService);
    const isSelfhosted = useLiveData(serverService.server.config$.selector(c => c.type === ServerDeploymentType.Selfhosted));
    const serverName = useLiveData(serverService.server.config$.selector(c => c.serverName));
    const verifyToken = useLiveData(captchaService.verifyToken$);
    const needCaptcha = useLiveData(captchaService.needCaptcha$);
    const challenge = useLiveData(captchaService.challenge$);
    const [isLoading, setIsLoading] = useState(false);
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
    const onSignIn = useAsyncCallback(async () => {
        if (isLoading || (!verifyToken && needCaptcha))
            return;
        setIsLoading(true);
        try {
            captchaService.revalidate();
            await authService.signInPassword({
                email,
                password,
                verifyToken,
                challenge,
            });
        }
        catch (err) {
            console.error(err);
            setPasswordError(true);
        }
        finally {
            setIsLoading(false);
        }
    }, [
        isLoading,
        verifyToken,
        needCaptcha,
        captchaService,
        authService,
        email,
        password,
        challenge,
    ]);
    const sendMagicLink = useCallback(() => {
        changeState(prev => ({ ...prev, step: 'signInWithEmail' }));
    }, [changeState]);
    return (_jsxs(AuthContainer, { children: [_jsx(AuthHeader, { title: t['com.affine.auth.sign.in'](), subTitle: serverName }), _jsxs(AuthContent, { children: [_jsx(AuthInput, { label: t['com.affine.settings.email'](), disabled: true, value: email }), _jsx(AuthInput, { autoFocus: true, "data-testid": "password-input", label: t['com.affine.auth.password'](), value: password, type: "password", onChange: useCallback((value) => {
                            setPassword(value);
                        }, []), error: passwordError, errorHint: t['com.affine.auth.password.error'](), onEnter: onSignIn }), !isSelfhosted && (_jsx("div", { className: styles.passwordButtonRow, children: _jsx("a", { "data-testid": "send-magic-link-button", className: styles.linkButton, onClick: sendMagicLink, children: t['com.affine.auth.sign.auth.code.send-email.sign-in']() }) })), !verifyToken && needCaptcha && _jsx(Captcha, {}), _jsx(Button, { "data-testid": "sign-in-button", variant: "primary", size: "extraLarge", style: { width: '100%' }, disabled: isLoading || (!verifyToken && needCaptcha), onClick: onSignIn, children: t['com.affine.auth.sign.in']() })] }), _jsx(AuthFooter, { children: _jsx(Back, { changeState: changeState }) })] }));
};
//# sourceMappingURL=sign-in-with-password.js.map