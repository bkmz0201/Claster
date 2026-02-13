import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { AuthService, ServerService } from '@affine/core/modules/cloud';
import { NativePaywallService } from '@affine/core/modules/paywall';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './styles.css';
export const UserSubscription = () => {
    const serverService = useService(ServerService);
    const authService = useService(AuthService);
    const nativePaywallProvider = useService(NativePaywallService).getNativePaywallProvider();
    const t = useI18n();
    const supported = useLiveData(serverService.server.features$.map(f => f.payment));
    const loggedIn = useLiveData(authService.session.status$) === 'authenticated';
    if (!loggedIn) {
        return null;
    }
    if (!supported) {
        // TODO: enable this
        // return null;
    }
    if (!nativePaywallProvider) {
        return null;
    }
    return (_jsxs("div", { className: styles.root, children: [_jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.title, children: t['com.affine.payment.subscription.title']() }), _jsx("div", { className: styles.description, children: t['com.affine.payment.subscription.description']() })] }), _jsx(Button, { className: styles.button, variant: "primary", onClick: () => void nativePaywallProvider.showPaywall('Pro').catch(console.error), children: t['com.affine.payment.subscription.button']() })] }));
};
//# sourceMappingURL=index.js.map