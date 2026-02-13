import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { notify } from '@affine/component';
import { AuthContainer, AuthContent, AuthFooter, AuthHeader, AuthInput, } from '@affine/component/auth-components';
import { Button } from '@affine/component/ui/button';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { AuthService, CaptchaService } from '@affine/core/modules/cloud';
import { Unreachable } from '@affine/env/constant';
import { UserFriendlyError } from '@affine/error';
import { Trans, useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useRef, useState, } from 'react';
import { Back } from './back';
import { Captcha } from './captcha';
import * as style from './style.css';
export const SignInWithEmailStep = ({ state, changeState, onAuthenticated, }) => {
    const initialSent = useRef(false);
    const [resendCountDown, setResendCountDown] = useState(0);
    const email = state.email;
    if (!email) {
        throw new Unreachable();
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setResendCountDown(c => Math.max(c - 1, 0));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState();
    const t = useI18n();
    const authService = useService(AuthService);
    const captchaService = useService(CaptchaService);
    const verifyToken = useLiveData(captchaService.verifyToken$);
    const needCaptcha = useLiveData(captchaService.needCaptcha$);
    const challenge = useLiveData(captchaService.challenge$);
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
    const sendEmail = useAsyncCallback(async () => {
        if (isSending || (!verifyToken && needCaptcha))
            return;
        setIsSending(true);
        try {
            setResendCountDown(60);
            captchaService.revalidate();
            await authService.sendEmailMagicLink(email, verifyToken, challenge, state.redirectUrl);
        }
        catch (err) {
            console.error(err);
            const error = UserFriendlyError.fromAny(err);
            notify.error({
                title: 'Failed to sign in',
                message: t[`error.${error.name}`](error.data),
            });
        }
        setIsSending(false);
    }, [
        authService,
        captchaService,
        challenge,
        email,
        isSending,
        needCaptcha,
        state.redirectUrl,
        verifyToken,
        t,
    ]);
    useEffect(() => {
        if (!initialSent.current && (verifyToken || !needCaptcha)) {
            initialSent.current = true;
            sendEmail();
        }
    }, [initialSent, needCaptcha, sendEmail, verifyToken]);
    const onSignInWithPasswordClick = useCallback(() => {
        changeState(prev => ({ ...prev, step: 'signInWithPassword' }));
    }, [changeState]);
    const onOtpChanged = useCallback((value) => {
        setOtp(value);
        setOtpError(undefined);
    }, []);
    const onContinue = useAsyncCallback(async () => {
        if (isVerifying)
            return;
        if (otp.length !== 6 || !/[0-9]{6}/.test(otp)) {
            setOtpError(t['com.affine.auth.sign.auth.code.invalid']());
            return;
        }
        setIsVerifying(true);
        try {
            await authService.signInMagicLink(email, otp, false);
        }
        catch (e) {
            notify.error({
                title: e.message,
            });
            setOtpError(t['com.affine.auth.sign.auth.code.invalid']());
        }
        finally {
            setIsVerifying(false);
        }
    }, [authService, email, isVerifying, otp, t]);
    return !verifyToken && needCaptcha ? (_jsxs(_Fragment, { children: [_jsx(AuthHeader, { title: t['com.affine.auth.sign.in']() }), _jsx(AuthContent, { style: { height: 100 }, children: _jsx(Captcha, {}) }), _jsx(Back, { changeState: changeState })] })) : (_jsxs(AuthContainer, { children: [_jsx(AuthHeader, { title: t['com.affine.auth.sign.in'](), subTitle: t['com.affine.auth.sign.in.sent.email.subtitle']() }), _jsxs(AuthContent, { children: [_jsx("p", { children: _jsx(Trans, { i18nKey: "com.affine.auth.sign.auth.code.hint", values: { email }, components: { a: _jsx("a", { href: `mailto:${email}` }) } }) }), _jsx(AuthInput, { placeholder: t['com.affine.auth.sign.auth.code'](), onChange: onOtpChanged, error: !!otpError, errorHint: otpError, onEnter: onContinue, type: "text", required: true, maxLength: 6 }), _jsx(Button, { style: { width: '100%' }, "data-testid": "continue-code-button", size: "extraLarge", block: true, onClick: onContinue, disabled: !!otpError || isVerifying, loading: isVerifying, children: t['com.affine.auth.sign.auth.code.continue']() }), _jsx(Button, { disabled: resendCountDown > 0, variant: "plain", onClick: sendEmail, style: { padding: '4px' }, children: resendCountDown <= 0 ? (t['com.affine.auth.sign.auth.code.resend']()) : (_jsx(Trans, { i18nKey: "com.affine.auth.sign.auth.code.resend.hint", values: { second: resendCountDown } })) })] }), _jsxs(AuthFooter, { children: [_jsxs("div", { className: style.authMessage, style: { marginTop: 20 }, children: [t['com.affine.auth.sign.auth.code.message'](), "\u00A0", state.hasPassword && (_jsx(Trans, { i18nKey: "com.affine.auth.sign.auth.code.message.password", components: {
                                    1: (_jsx("span", { className: "link", "data-testid": "sign-in-with-password", onClick: onSignInWithPasswordClick })),
                                } }))] }), _jsx(Back, { changeState: changeState })] })] }));
};
//# sourceMappingURL=sign-in-with-email.js.map