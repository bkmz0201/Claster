import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemedImg } from '../../ui/themed-img';
import { AffineOtherPageLayout } from '../affine-other-page-layout';
import illustrationDark from '../affine-other-page-layout/assets/other-page.dark.png';
import illustrationLight from '../affine-other-page-layout/assets/other-page.light.png';
import { authPageContainer, hideInSmallScreen, illustration, } from './share.css';
export const AuthPageContainer = ({ children, title, subtitle }) => {
    return (_jsx(AffineOtherPageLayout, { children: _jsx("div", { className: authPageContainer, children: _jsxs("div", { className: "wrapper", children: [_jsxs("div", { className: "content", children: [_jsx("p", { className: "title", children: title }), _jsx("div", { className: "subtitle", children: subtitle }), children] }), _jsx("div", { className: hideInSmallScreen, children: _jsx(ThemedImg, { draggable: false, className: illustration, lightSrc: illustrationLight, darkSrc: illustrationDark }) })] }) }) }));
};
//# sourceMappingURL=auth-page-container.js.map