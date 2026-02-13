import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthPageContainer } from '@affine/component/auth-components';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { Trans, useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as styles from './styles.css';
/**
 * /ai-upgrade-success page
 *
 * only on web
 */
export const Component = () => {
    const t = useI18n();
    const [params] = useSearchParams();
    const { jumpToIndex, jumpToOpenInApp } = useNavigateHelper();
    const openAFFiNE = useCallback(() => {
        if (params.get('client')) {
            return jumpToOpenInApp('bring-to-front');
        }
        else {
            jumpToIndex();
        }
    }, [jumpToIndex, jumpToOpenInApp, params]);
    const subtitle = (_jsxs("div", { className: styles.leftContentText, children: [t['com.affine.payment.ai-upgrade-success-page.text'](), _jsx("div", { children: _jsx(Trans, { i18nKey: 'com.affine.payment.upgrade-success-page.support', components: {
                        1: (_jsx("a", { href: "mailto:support@toeverything.info", className: styles.mail })),
                    } }) })] }));
    return (_jsx(AuthPageContainer, { title: t['com.affine.payment.ai-upgrade-success-page.title'](), subtitle: subtitle, children: _jsx(Button, { variant: "primary", size: "extraLarge", onClick: openAFFiNE, children: t['com.affine.other-page.nav.open-affine']() }) }));
};
//# sourceMappingURL=index.js.map