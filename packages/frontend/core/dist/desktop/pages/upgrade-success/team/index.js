import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthPageContainer } from '@affine/component/auth-components';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { Trans, useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import * as styles from './styles.css';
/**
 * /upgrade-success/team page
 *
 * only on web
 */
export const Component = () => {
    const t = useI18n();
    const { jumpToIndex } = useNavigateHelper();
    const openWorkspace = useCallback(() => {
        jumpToIndex();
    }, [jumpToIndex]);
    const subtitle = (_jsxs("div", { className: styles.leftContentText, children: [_jsx("div", { children: t['com.affine.payment.upgrade-success-page.team.text-1']() }), _jsx("div", { children: _jsx(Trans, { i18nKey: 'com.affine.payment.upgrade-success-page.team.text-2', components: {
                        1: (_jsx("a", { href: "mailto:support@toeverything.info", className: styles.mail })),
                    } }) })] }));
    return (_jsx(AuthPageContainer, { title: t['com.affine.payment.upgrade-success-page.title'](), subtitle: subtitle, children: _jsx(Button, { variant: "primary", size: "extraLarge", onClick: openWorkspace, children: t['Visit Workspace']() }) }));
};
//# sourceMappingURL=index.js.map