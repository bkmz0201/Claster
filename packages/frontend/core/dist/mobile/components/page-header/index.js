import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SafeArea } from '@affine/component';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { NavigationBackButton } from '../navigation-back';
import * as styles from './styles.css';
export const PageHeader = forwardRef(function PageHeader({ back, backIcon, backAction, prefix, suffix, children, className, centerContent = true, contentClassName, prefixClassName, prefixStyle, suffixClassName, suffixStyle, bottom, bottomSpacer, ...attrs }, ref) {
    return (_jsxs(_Fragment, { children: [_jsxs(SafeArea, { top: true, ref: ref, className: clsx(styles.root, className), "data-testid": "mobile-page-header", ...attrs, children: [_jsxs("header", { className: styles.inner, children: [_jsxs("section", { className: clsx(styles.prefix, prefixClassName), style: prefixStyle, children: [back ? (_jsx(NavigationBackButton, { icon: backIcon, backAction: backAction })) : null, prefix] }), _jsx("section", { className: clsx(styles.content, contentClassName, {
                                    center: centerContent,
                                }), children: children }), _jsx("section", { className: clsx(styles.suffix, suffixClassName), style: suffixStyle, children: suffix })] }), bottom] }), _jsxs(SafeArea, { top: true, children: [_jsx("div", { className: styles.headerSpacer }), bottom ? _jsx("div", { style: { height: bottomSpacer ?? 0 } }) : null] })] }));
});
//# sourceMappingURL=index.js.map