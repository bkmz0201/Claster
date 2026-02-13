import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component/ui/button';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { appIconMap, appNames } from '@affine/core/utils/channel';
import { Trans, useI18n } from '@affine/i18n';
import { LocalWorkspaceIcon, Logo1Icon } from '@blocksuite/icons/rc';
import { useServiceOptional } from '@toeverything/infra';
import { useCallback } from 'react';
import { getOpenUrlInDesktopAppLink } from '../utils';
import * as styles from './open-in-app-page.css';
let lastOpened = '';
const channel = BUILD_CONFIG.appBuildType;
const url = 'https://affine.pro/download' + (channel !== 'stable' ? '/beta-canary' : '');
export const OpenInAppPage = ({ urlToOpen, openHereClicked, mode = 'auth', }) => {
    // default to open the current page in desktop app
    urlToOpen ??= getOpenUrlInDesktopAppLink(window.location.href, true);
    const workspaceDialogService = useServiceOptional(WorkspaceDialogService);
    const t = useI18n();
    const openDownloadLink = useCallback(() => {
        open(url, '_blank');
    }, []);
    const appIcon = appIconMap[channel];
    const appName = appNames[channel];
    const goToAppearanceSetting = useCallback((e) => {
        openHereClicked?.(e);
        workspaceDialogService?.open('setting', {
            activeTab: 'appearance',
        });
    }, [workspaceDialogService, openHereClicked]);
    if (urlToOpen && lastOpened !== urlToOpen) {
        lastOpened = urlToOpen;
        location.href = urlToOpen;
    }
    if (!urlToOpen) {
        return null;
    }
    return (_jsxs("div", { className: styles.root, children: [_jsxs("div", { className: styles.topNav, children: [_jsx("a", { href: "/", rel: "noreferrer", className: styles.affineLogo, children: _jsx(Logo1Icon, { width: 24, height: 24 }) }), _jsxs("div", { className: styles.topNavLinks, children: [_jsx("a", { href: "https://affine.pro", target: "_blank", rel: "noreferrer", className: styles.topNavLink, children: "Official Website" }), _jsx("a", { href: "https://affine.pro/blog", target: "_blank", rel: "noreferrer", className: styles.topNavLink, children: "Blog" }), _jsx("a", { href: "https://affine.pro/about-us", target: "_blank", rel: "noreferrer", className: styles.topNavLink, children: "Contact us" })] }), _jsx(Button, { onClick: openDownloadLink, children: t['com.affine.auth.open.affine.download-app']() })] }), _jsxs("div", { className: styles.centerContent, children: [_jsx("img", { src: appIcon, alt: appName, width: 120, height: 120 }), _jsx("div", { className: styles.prompt, children: mode === 'open-doc' ? (_jsxs(Trans, { i18nKey: "com.affine.auth.open.affine.open-doc-prompt", children: ["This doc is now opened in ", appName] })) : (_jsxs(Trans, { i18nKey: "com.affine.auth.open.affine.prompt", children: ["Open ", appName, " app now"] })) }), _jsxs("div", { className: styles.promptLinks, children: [openHereClicked && (_jsx("a", { className: styles.promptLink, onClick: openHereClicked, target: "_blank", rel: "noreferrer", children: t['com.affine.auth.open.affine.doc.open-here']() })), _jsx("a", { className: styles.promptLink, href: urlToOpen, target: "_blank", rel: "noreferrer", children: t['com.affine.auth.open.affine.try-again']() })] })] }), mode === 'open-doc' ? (_jsxs("div", { className: styles.docFooter, children: [_jsx("button", { className: styles.editSettingsLink, onClick: goToAppearanceSetting, children: t['com.affine.auth.open.affine.doc.edit-settings']() }), _jsxs("div", { className: styles.docFooterText, children: [_jsx(LocalWorkspaceIcon, { width: 16, height: 16 }), t['com.affine.auth.open.affine.doc.footer-text']()] })] })) : null] }));
};
//# sourceMappingURL=open-in-app-page.js.map