import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Checkbox, IconButton } from '@affine/component';
import { OpenInAppService, OpenLinkMode, } from '@affine/core/modules/open-in-app';
import { appIconMap } from '@affine/core/utils';
import { Trans, useI18n } from '@affine/i18n';
import { CloseIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import * as styles from './open-in-app-card.css';
export const OpenInAppCard = () => {
    const openInAppService = useService(OpenInAppService);
    const show = useLiveData(openInAppService.showOpenInAppBanner$);
    const t = useI18n();
    const [remember, setRemember] = useState(false);
    const onOpen = useCallback(() => {
        openInAppService.showOpenInAppPage();
        if (remember) {
            openInAppService.dismissBanner(OpenLinkMode.OPEN_IN_DESKTOP_APP);
        }
    }, [openInAppService, remember]);
    const onDismiss = useCallback(() => {
        openInAppService.dismissBanner(remember ? OpenLinkMode.OPEN_IN_WEB : undefined);
    }, [openInAppService, remember]);
    const onToggleRemember = useCallback(() => {
        setRemember(v => !v);
    }, []);
    const appIcon = appIconMap[BUILD_CONFIG.appBuildType];
    return (_jsxs("div", { "data-testid": "open-in-app-card", className: styles.root, "data-hidden": !show, children: [_jsx("div", { className: styles.appIconCol, children: _jsx("img", { src: appIcon, alt: "app icon", width: 48, height: 48 }) }), _jsxs("div", { className: styles.contentCol, children: [_jsxs("div", { className: styles.titleRow, children: [t.t('com.affine.open-in-app.card.title'), _jsx("div", { className: styles.spacer }), _jsx(IconButton, { className: styles.closeButton, icon: _jsx(CloseIcon, {}), onClick: onDismiss })] }), _jsx("div", { className: styles.subtitleRow, children: _jsxs(Trans, { i18nKey: "com.affine.open-in-app.card.subtitle", children: ["Don't have the app?", _jsx("a", { href: "https://affine.pro/download", target: "_blank", rel: "noreferrer", className: styles.link, children: "Click to download" }), "."] }) }), _jsxs("div", { className: styles.controlsRow, children: [_jsxs("label", { className: styles.rememberLabel, children: [_jsx(Checkbox, { className: styles.rememberCheckbox, checked: remember, onChange: onToggleRemember }), t.t('com.affine.open-in-app.card.remember')] }), _jsx("div", { className: styles.spacer }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx(Button, { variant: "secondary", size: "custom", className: styles.button, onClick: onDismiss, children: t.t('com.affine.open-in-app.card.button.dismiss') }), _jsx(Button, { variant: "primary", size: "custom", className: styles.button, onClick: onOpen, children: t.t('com.affine.open-in-app.card.button.open') })] })] })] })] }));
};
//# sourceMappingURL=open-in-app-card.js.map