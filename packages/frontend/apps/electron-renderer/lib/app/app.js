import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AffineContext } from '@affine/core/components/context';
import { WindowsAppControls } from '@affine/core/components/pure/header/windows-app-controls';
import { AppContainer } from '@affine/core/desktop/components/app-container';
import { router } from '@affine/core/desktop/router';
import { I18nProvider } from '@affine/core/modules/i18n';
import createEmotionCache from '@affine/core/utils/create-emotion-cache';
import { CacheProvider } from '@emotion/react';
import { FrameworkRoot, getCurrentStore } from '@toeverything/infra';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { setupEffects } from './effects';
import { DesktopLanguageSync } from './language-sync';
import { DesktopThemeSync } from './theme-sync';
const { frameworkProvider } = setupEffects();
const desktopWhiteList = [
    '/open-app/signin-redirect',
    '/open-app/url',
    '/upgrade-success',
    '/ai-upgrade-success',
    '/share',
    '/oauth',
    '/magic-link',
];
if (!BUILD_CONFIG.isElectron &&
    BUILD_CONFIG.debug &&
    desktopWhiteList.every(path => !location.pathname.startsWith(path))) {
    document.body.innerHTML = `<h1 style="color:red;font-size:5rem;text-align:center;">Don't run electron entry in browser.</h1>`;
    throw new Error('Wrong distribution');
}
const cache = createEmotionCache();
const future = {
    v7_startTransition: true,
};
export function App() {
    return (_jsx(Suspense, { children: _jsx(FrameworkRoot, { framework: frameworkProvider, children: _jsx(CacheProvider, { value: cache, children: _jsx(I18nProvider, { children: _jsxs(AffineContext, { store: getCurrentStore(), children: [_jsx(DesktopThemeSync, {}), _jsx(DesktopLanguageSync, {}), _jsx(RouterProvider, { fallbackElement: _jsx(AppContainer, { fallback: true }), router: router, future: future }), environment.isWindows && (_jsx("div", { style: { position: 'fixed', right: 0, top: 0, zIndex: 5 }, children: _jsx(WindowsAppControls, {}) }))] }) }) }) }) }));
}
//# sourceMappingURL=app.js.map