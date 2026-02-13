import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { Button } from '../../ui/button';
import { AuthPageContainer } from './auth-page-container';
export const SignInSuccessPage = ({ onOpenAffine }) => {
    const t = useI18n();
    return (_jsx(AuthPageContainer, { title: t['com.affine.auth.signed.success.title'](), subtitle: t['com.affine.auth.signed.success.subtitle'](), children: _jsx(Button, { variant: "primary", size: "large", onClick: onOpenAffine, children: t['com.affine.auth.open.affine']() }) }));
};
//# sourceMappingURL=sign-in-success-page.js.map