import { jsx as _jsx } from "react/jsx-runtime";
import { ErrorBoundary } from '@sentry/react';
import { useCallback } from 'react';
import { AffineErrorFallback } from './affine-error-fallback';
export {} from './error-basic/fallback-creator';
/**
 * TODO(@eyhn): Unify with SWRErrorBoundary
 */
export const AffineErrorBoundary = props => {
    const fallbackRender = useCallback(fallbackProps => {
        return (_jsx(AffineErrorFallback, { ...fallbackProps, height: props.height, className: props.className }));
    }, [props.height, props.className]);
    const onError = useCallback((error, componentStack) => {
        console.error('Uncaught error:', error, componentStack);
    }, []);
    return (_jsx(ErrorBoundary, { fallback: fallbackRender, onError: onError, children: props.children }));
};
//# sourceMappingURL=index.js.map