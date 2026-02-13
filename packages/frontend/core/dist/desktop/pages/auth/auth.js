import { jsx as _jsx } from "react/jsx-runtime";
import { notify } from '@affine/component';
import { ChangeEmailPage, ChangePasswordPage, OnboardingPage, SetPasswordPage, SignInSuccessPage, SignUpPage, } from '@affine/component/auth-components';
import { changePasswordMutation, sendVerifyChangeEmailMutation, } from '@affine/graphql';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { redirect, useParams, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useMutation } from '../../../components/hooks/use-mutation';
import { RouteLogic, useNavigateHelper, } from '../../../components/hooks/use-navigate-helper';
import { AuthService, ServerService } from '../../../modules/cloud';
import { AppContainer } from '../../components/app-container';
import { ConfirmChangeEmail } from './confirm-change-email';
import { ConfirmVerifiedEmail } from './email-verified-email';
const authTypeSchema = z.enum([
    'onboarding',
    'setPassword',
    'signIn',
    'changePassword',
    'signUp',
    'changeEmail',
    'confirm-change-email',
    'subscription-redirect',
    'verify-email',
]);
export const Component = () => {
    const authService = useService(AuthService);
    const account = useLiveData(authService.session.account$);
    const t = useI18n();
    const serverService = useService(ServerService);
    const passwordLimits = useLiveData(serverService.server.credentialsRequirement$.map(r => r?.password));
    const { authType } = useParams();
    const [searchParams] = useSearchParams();
    const { trigger: changePassword } = useMutation({
        mutation: changePasswordMutation,
    });
    const { trigger: sendVerifyChangeEmail } = useMutation({
        mutation: sendVerifyChangeEmailMutation,
    });
    const { jumpToIndex } = useNavigateHelper();
    const onSendVerifyChangeEmail = useCallback(async (email) => {
        const res = await sendVerifyChangeEmail({
            token: searchParams.get('token') || '',
            email,
            callbackUrl: `/auth/confirm-change-email`,
        }).catch(console.error);
        // FIXME: There is not notification
        if (res?.sendVerifyChangeEmail) {
            notify.success({
                title: t['com.affine.auth.sent.verify.email.hint'](),
            });
        }
        else {
            notify.error({
                title: t['com.affine.auth.sent.change.email.fail'](),
            });
        }
        return !!res?.sendVerifyChangeEmail;
    }, [searchParams, sendVerifyChangeEmail, t]);
    const onSetPassword = useCallback(async (password) => {
        await changePassword({
            token: searchParams.get('token') || '',
            userId: searchParams.get('userId') || '',
            newPassword: password,
        });
    }, [changePassword, searchParams]);
    const onOpenAffine = useCallback(() => {
        jumpToIndex(RouteLogic.REPLACE);
    }, [jumpToIndex]);
    if (!passwordLimits) {
        return _jsx(AppContainer, { fallback: true });
    }
    switch (authType) {
        case 'onboarding':
            return (account && _jsx(OnboardingPage, { user: account, onOpenAffine: onOpenAffine }));
        case 'signUp': {
            return (account && (_jsx(SignUpPage, { user: account, passwordLimits: passwordLimits, onSetPassword: onSetPassword, onOpenAffine: onOpenAffine })));
        }
        case 'signIn': {
            return _jsx(SignInSuccessPage, { onOpenAffine: onOpenAffine });
        }
        case 'changePassword': {
            return (_jsx(ChangePasswordPage, { passwordLimits: passwordLimits, onSetPassword: onSetPassword, onOpenAffine: onOpenAffine }));
        }
        case 'setPassword': {
            return (_jsx(SetPasswordPage, { passwordLimits: passwordLimits, onSetPassword: onSetPassword, onOpenAffine: onOpenAffine }));
        }
        case 'changeEmail': {
            return (_jsx(ChangeEmailPage, { onChangeEmail: onSendVerifyChangeEmail, onOpenAffine: onOpenAffine }));
        }
        case 'confirm-change-email': {
            return _jsx(ConfirmChangeEmail, { onOpenAffine: onOpenAffine });
        }
        case 'verify-email': {
            return _jsx(ConfirmVerifiedEmail, { onOpenAffine: onOpenAffine });
        }
    }
    return null;
};
export const loader = async (args) => {
    if (!args.params.authType) {
        return redirect('/404');
    }
    if (!authTypeSchema.safeParse(args.params.authType).success) {
        return redirect('/404');
    }
    return null;
};
//# sourceMappingURL=auth.js.map