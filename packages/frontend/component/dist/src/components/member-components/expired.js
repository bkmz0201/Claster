import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { Button } from '../../ui/button';
import { AuthPageContainer } from '../auth-components';
export const ExpiredPage = ({ onOpenAffine }) => {
    const t = useI18n();
    return (_jsx(AuthPageContainer, { title: t['com.affine.expired.page.title'](), subtitle: t['com.affine.expired.page.new-subtitle'](), children: _jsx(Button, { variant: "primary", size: "large", onClick: onOpenAffine, children: t['com.affine.auth.open.affine']() }) }));
};
//# sourceMappingURL=expired.js.map