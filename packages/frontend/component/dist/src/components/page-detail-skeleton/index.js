import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Trans, useI18n } from '@affine/i18n';
import clsx from 'clsx';
import { useCallback } from 'react';
import { Button } from '../../ui/button';
import { Loading } from '../../ui/loading';
import { ThemedImg } from '../../ui/themed-img';
import imageUrlForDarkLoading from './assets/loading.dark.png';
import imageUrlForLightLoading from './assets/loading.light.png';
import * as styles from './index.css';
export const EditorLoading = ({ longerLoading = false, }) => {
    const t = useI18n();
    const reloadPage = useCallback(() => {
        document.location.reload();
    }, []);
    return (_jsxs("div", { className: styles.blockSuiteEditorStyle, children: [_jsx(ThemedImg, { style: { width: '300px' }, draggable: false, className: styles.illustration, lightSrc: imageUrlForLightLoading, darkSrc: imageUrlForDarkLoading }), longerLoading ? (_jsxs("div", { className: styles.content, "data-longer-loading": true, children: [_jsxs("div", { children: [_jsx("div", { className: styles.text, "data-longer-loading": true, children: t['com.affine.error.loading-timeout-error']() }), _jsx("div", { className: styles.text, "data-longer-loading": true, children: _jsx(Trans, { i18nKey: "com.affine.error.contact-us", components: {
                                        1: (_jsx("a", { style: { color: 'var(--affine-primary-color)' }, href: "https://community.affine.pro", target: "__blank" })),
                                    } }) })] }), _jsx(Button, { size: "large", className: clsx(BUILD_CONFIG.isMobileEdition
                            ? styles.mobileActionButton
                            : styles.actionButton), contentClassName: clsx(BUILD_CONFIG.isMobileEdition
                            ? styles.mobileActionContent
                            : styles.actionContent), onClick: reloadPage, variant: "primary", children: t['com.affine.error.reload']() })] })) : (_jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.title, children: [_jsx(Loading, { size: 20, className: styles.loadingIcon }), t['com.affine.loading']()] }), _jsx("div", { className: styles.text, children: t['com.affine.loading.description']() })] }))] }));
};
export const PageDetailLoading = () => {
    return (_jsx("div", { className: styles.pageDetailSkeletonStyle, children: _jsx(EditorLoading, {}) }));
};
//# sourceMappingURL=index.js.map