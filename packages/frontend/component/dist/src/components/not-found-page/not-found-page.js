import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { SignOutIcon } from '@blocksuite/icons/rc';
import { Avatar } from '../../ui/avatar';
import { Button, IconButton } from '../../ui/button';
import { ThemedImg } from '../../ui/themed-img';
import { AffineOtherPageLayout } from '../affine-other-page-layout';
import illustrationDark from '../affine-other-page-layout/assets/other-page.dark.png';
import illustrationLight from '../affine-other-page-layout/assets/other-page.light.png';
import { illustration, info, largeButtonEffect, notFoundPageContainer, wrapper, } from './styles.css';
export const NoPermissionOrNotFound = ({ user, onBack, onSignOut, signInComponent, }) => {
    const t = useI18n();
    return (_jsx(AffineOtherPageLayout, { children: _jsx("div", { className: notFoundPageContainer, "data-testid": "not-found", children: user ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: info, children: [_jsx("p", { className: wrapper, children: t['404.hint']() }), _jsx("div", { className: wrapper, children: _jsx(Button, { variant: "primary", size: "extraLarge", onClick: onBack, className: largeButtonEffect, children: t['404.back']() }) }), _jsxs("div", { className: wrapper, children: [_jsx(Avatar, { url: user.avatar ?? user.image, name: user.label }), _jsx("span", { style: { margin: '0 12px' }, children: user.email }), _jsx(IconButton, { onClick: onSignOut, size: "20", tooltip: t['404.signOut'](), children: _jsx(SignOutIcon, {}) })] })] }), _jsx("div", { className: wrapper, children: _jsx(ThemedImg, { draggable: false, className: illustration, lightSrc: illustrationLight, darkSrc: illustrationDark }) })] })) : (signInComponent) }) }));
};
export const NotFoundPage = ({ user, onBack, onSignOut, }) => {
    const t = useI18n();
    return (_jsx(AffineOtherPageLayout, { children: _jsxs("div", { className: notFoundPageContainer, "data-testid": "not-found", children: [_jsxs("div", { className: info, children: [_jsx("p", { className: wrapper, children: t['404.hint']() }), _jsx("div", { className: wrapper, children: _jsx(Button, { variant: "primary", size: "extraLarge", onClick: onBack, className: largeButtonEffect, children: t['404.back']() }) }), user ? (_jsxs("div", { className: wrapper, children: [_jsx(Avatar, { url: user.avatar ?? user.image, name: user.label }), _jsx("span", { style: { margin: '0 12px' }, children: user.email }), _jsx(IconButton, { onClick: onSignOut, size: "20", tooltip: t['404.signOut'](), children: _jsx(SignOutIcon, {}) })] })) : null] }), _jsx("div", { className: wrapper, children: _jsx(ThemedImg, { draggable: false, className: illustration, lightSrc: illustrationLight, darkSrc: illustrationDark }) })] }) }));
};
//# sourceMappingURL=not-found-page.js.map