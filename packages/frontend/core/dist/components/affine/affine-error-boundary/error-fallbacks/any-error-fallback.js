import { jsx as _jsx } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import { ErrorDetail } from '../error-basic/error-detail';
/**
 * TODO(@eyhn): Support reload and retry two reset actions in page error and area error.
 */
export const AnyErrorFallback = props => {
    const { error } = props;
    const t = useI18n();
    const reloadPage = useCallback(() => {
        document.location.reload();
    }, []);
    return (_jsx(ErrorDetail, { title: t['com.affine.error.unexpected-error.title'](), resetError: reloadPage, buttonText: t['com.affine.error.reload'](), description: 'message' in error ? error.message : `${error}`, error: error }));
};
//# sourceMappingURL=any-error-fallback.js.map