import { jsx as _jsx } from "react/jsx-runtime";
import { ExpiredPage } from '@affine/component/member-components';
import { useCallback } from 'react';
import { RouteLogic, useNavigateHelper, } from '../../../components/hooks/use-navigate-helper';
/**
 * /expired page
 *
 * only on web
 */
export const Component = () => {
    const { jumpToIndex } = useNavigateHelper();
    const onOpenAffine = useCallback(() => {
        jumpToIndex(RouteLogic.REPLACE);
    }, [jumpToIndex]);
    return _jsx(ExpiredPage, { onOpenAffine: onOpenAffine });
};
//# sourceMappingURL=index.js.map