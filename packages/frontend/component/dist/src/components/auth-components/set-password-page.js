import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { useCallback, useState } from 'react';
import { Button } from '../../ui/button';
import { notify } from '../../ui/notification';
import { AuthPageContainer } from './auth-page-container';
import { SetPassword } from './set-password';
export const SetPasswordPage = ({ passwordLimits, onSetPassword: propsOnSetPassword, onOpenAffine }) => {
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
    return (_jsx(AuthPageContainer, { title: hasSetUp
            ? t['com.affine.auth.set.password.page.success']()
            : t['com.affine.auth.set.password.page.title'](), subtitle: hasSetUp
            ? t['com.affine.auth.sent.set.password.success.message']()
            : t['com.affine.auth.page.sent.email.subtitle']({
                min: String(passwordLimits.minLength),
                max: String(passwordLimits.maxLength),
            }), children: hasSetUp ? (_jsx(Button, { variant: "primary", size: "large", onClick: onOpenAffine, children: t['com.affine.auth.open.affine']() })) : (_jsx(SetPassword, { passwordLimits: passwordLimits, onSetPassword: onSetPassword })) }));
};
//# sourceMappingURL=set-password-page.js.map