import { jsx as _jsx } from "react/jsx-runtime";
import { ServersService } from '@affine/core/modules/cloud';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
import { useMemo } from 'react';
export const CurrentServerScopeProvider = ({ children, }) => {
    const globalContext = useService(GlobalContextService).globalContext;
    const serversService = useService(ServersService);
    const currentServerId = useLiveData(globalContext.serverId.$);
    const serverService = useLiveData(useMemo(() => {
        if (!currentServerId) {
            return null;
        }
        return serversService.server$(currentServerId);
    }, [currentServerId, serversService]));
    if (!serverService) {
        // todo(@pengx17): render a loading/error component here if not found?
        return null;
    }
    return (_jsx(FrameworkScope, { scope: serverService.scope, children: children }));
};
export const useCurrentServerService = () => {
    const globalContext = useService(GlobalContextService).globalContext;
    const serversService = useService(ServersService);
    const currentServerId = useLiveData(globalContext.serverId.$);
    const serverService = useLiveData(useMemo(() => {
        if (!currentServerId) {
            return null;
        }
        return serversService.server$(currentServerId);
    }, [currentServerId, serversService]));
    return serverService ?? undefined;
};
//# sourceMappingURL=current-server-scope.js.map