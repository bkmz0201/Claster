import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { useCallback, useState } from 'react';
import { Button } from '../../ui/button';
import { notify } from '../../ui/notification';
import { AuthPageContainer } from './auth-page-container';
import { SetPassword } from './set-password';
export const SignUpPage = ({ passwordLimits, user: { email }, onSetPassword: propsOnSetPassword, onOpenAffine, openButtonText, }) => {
    const t = useI18n();
    const [hasSetUp, setHasSetUp] = useState(false);
    const onSetPassword = useCallback((passWord) => {
        propsOnSetPassword(passWord)
            .then(() => setHasSetUp(true))
            .catch(e => notify.error({
            title: t['com.affine.auth.password.set-failed'](),
            message: String(e),
        }));
    }, [propsOnSetPassword, t]);
    const onLater = useCallback(() => {
        setHasSetUp(true);
    }, []);
    return (_jsx(AuthPageContainer, { title: hasSetUp
            ? t['com.affine.auth.sign.up.success.title']()
            : t['com.affine.auth.page.sent.email.title'](), subtitle: hasSetUp ? (t['com.affine.auth.sign.up.success.subtitle']()) : (_jsxs(_Fragment, { children: [t['com.affine.auth.page.sent.email.subtitle']({
                    min: String(passwordLimits.minLength),
                    max: String(passwordLimits.maxLength),
                }), _jsx("a", { href: `mailto:${email}`, children: email })] })), children: hasSetUp ? (_jsx(Button, { variant: "primary", size: "large", onClick: onOpenAffine, children: openButtonText ?? t['com.affine.auth.open.affine']() })) : (_jsx(SetPassword, { passwordLimits: passwordLimits, onSetPassword: onSetPassword, onLater: onLater, showLater: true })) }));
};
//# sourceMappingURL=sign-up-page.js.map