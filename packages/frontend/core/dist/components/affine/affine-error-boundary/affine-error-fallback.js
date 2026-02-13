import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { getCurrentStore } from '@toeverything/infra';
import clsx from 'clsx';
import { Provider } from 'jotai/react';
import { useCallback, useMemo } from 'react';
import { useRouteError } from 'react-router-dom';
import * as styles from './affine-error-fallback.css';
import { ErrorDetail } from './error-basic/error-detail';
import { ERROR_REFLECT_KEY } from './error-basic/fallback-creator';
import { DumpInfo } from './error-basic/info-logger';
import { AnyErrorFallback } from './error-fallbacks/any-error-fallback';
import { NoPageRootFallback } from './error-fallbacks/no-page-root-fallback';
import { PageNotFoundDetail } from './error-fallbacks/page-not-found-fallback';
/**
 * Register all fallback components here.
 * If have new one just add it to the set.
 */
const fallbacks = new Set([PageNotFoundDetail, NoPageRootFallback]);
function getErrorFallbackComponent(error) {
    for (const Component of fallbacks) {
        const ErrorConstructor = Reflect.get(Component, ERROR_REFLECT_KEY);
        if (ErrorConstructor && error instanceof ErrorConstructor) {
            return Component;
        }
    }
    return AnyErrorFallback;
}
export const AffineErrorFallback = props => {
    const { error, resetError, height } = props;
    const Component = useMemo(() => getErrorFallbackComponent(error), [error]);
    return (_jsxs("div", { className: clsx(styles.viewport, props.className), style: { height }, children: [_jsx(Component, { error: error, resetError: resetError }), _jsx(Provider, { store: getCurrentStore(), children: _jsx(DumpInfo, { error: error }) }, "JotaiProvider")] }));
};
export const AffineErrorComponent = () => {
    const error = useRouteError();
    const t = useI18n();
    const reloadPage = useCallback(() => {
        document.location.reload();
    }, []);
    return (_jsx(ErrorDetail, { title: t['com.affine.error.unexpected-error.title'](), resetError: reloadPage, buttonText: t['com.affine.error.reload'](), description: 'message' in error ? error.message : `${error}`, error: error }));
};
//# sourceMappingURL=affine-error-fallback.js.map