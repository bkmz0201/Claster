import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NotificationCenter } from '@affine/component';
import { DefaultServerService } from '@affine/core/modules/cloud';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GlobalDialogs } from '../../dialogs';
export const RootWrapper = () => {
    const defaultServerService = useService(DefaultServerService);
    const [isServerReady, setIsServerReady] = useState(false);
    useEffect(() => {
        if (isServerReady) {
            return;
        }
        const abortController = new AbortController();
        defaultServerService.server
            .waitForConfigRevalidation(abortController.signal)
            .then(() => setIsServerReady(true))
            .catch(console.error);
        return () => abortController.abort();
    }, [defaultServerService, isServerReady]);
    return (_jsxs(FrameworkScope, { scope: defaultServerService.server.scope, children: [_jsx(GlobalDialogs, {}), _jsx(NotificationCenter, {}), _jsx(Outlet, {})] }));
};
//# sourceMappingURL=index.js.map