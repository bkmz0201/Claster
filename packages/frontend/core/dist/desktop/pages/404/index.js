import { jsx as _jsx } from "react/jsx-runtime";
import { NoPermissionOrNotFound, NotFoundPage, } from '@affine/component/not-found-page';
import { useSignOut } from '@affine/core/components/hooks/affine/use-sign-out';
import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { FrameworkScope, useLiveData, useService, useServiceOptional, } from '@toeverything/infra';
import { useCallback, useEffect } from 'react';
import { RouteLogic, useNavigateHelper, } from '../../../components/hooks/use-navigate-helper';
import { ServersService } from '../../../modules/cloud';
import { SignIn } from '../auth/sign-in';
/**
 * only for web, should not be used in electron
 */
export const PageNotFound = ({ noPermission, }) => {
    const serversService = useService(ServersService);
    const serversWithAccount = useLiveData(serversService.serversWithAccount$);
    const desktopApi = useServiceOptional(DesktopApiService);
    // Check all servers for any logged in accounts to avoid showing sign-in page if user has an active session on any server
    const firstLogged = serversWithAccount.find(({ account }) => account !== null);
    const { jumpToIndex } = useNavigateHelper();
    const openSignOutModal = useSignOut();
    const handleBackButtonClick = useCallback(() => jumpToIndex(RouteLogic.REPLACE), [jumpToIndex]);
    useEffect(() => {
        desktopApi?.handler.ui.pingAppLayoutReady().catch(console.error);
    }, [desktopApi]);
    // not using workbench location or router location deliberately
    // strip the origin
    const currentUrl = window.location.href.replace(window.location.origin, '');
    return (_jsx(FrameworkScope, { scope: firstLogged?.server.scope, children: noPermission ? (_jsx(NoPermissionOrNotFound, { user: firstLogged?.account, onBack: handleBackButtonClick, onSignOut: openSignOutModal, signInComponent: _jsx(SignIn, { redirectUrl: currentUrl }) })) : (_jsx(NotFoundPage, { user: firstLogged?.account, onBack: handleBackButtonClick, onSignOut: openSignOutModal })) }));
};
export const Component = () => {
    return _jsx(PageNotFound, {});
};
//# sourceMappingURL=index.js.map