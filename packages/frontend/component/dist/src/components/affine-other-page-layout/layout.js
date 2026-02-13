import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component/ui/button';
import { useI18n } from '@affine/i18n';
import { Logo1Icon } from '@blocksuite/icons/rc';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import dotBgDark from './assets/dot-bg.dark.png';
import dotBgLight from './assets/dot-bg.light.png';
import { DesktopNavbar } from './desktop-navbar';
import * as styles from './index.css';
import { MobileNavbar } from './mobile-navbar';
export const AffineOtherPageLayout = ({ children, }) => {
    const t = useI18n();
    const openDownloadLink = useCallback(() => {
        open(BUILD_CONFIG.downloadUrl, '_blank');
    }, []);
    const { resolvedTheme } = useTheme();
    const backgroundImage = resolvedTheme === 'dark' && dotBgDark ? dotBgDark : dotBgLight;
    return (_jsxs("div", { className: styles.root, style: { backgroundImage: `url(${backgroundImage})` }, children: [BUILD_CONFIG.isElectron ? (_jsx("div", { className: styles.draggableHeader })) : (_jsxs("div", { className: styles.topNav, children: [_jsx("a", { href: "/", rel: "noreferrer", className: styles.affineLogo, children: _jsx(Logo1Icon, { width: 24, height: 24 }) }), _jsx(DesktopNavbar, {}), _jsx(Button, { onClick: openDownloadLink, className: styles.hideInSmallScreen, children: t['com.affine.auth.open.affine.download-app']() }), _jsx(MobileNavbar, {})] })), children] }));
};
//# sourceMappingURL=layout.js.map