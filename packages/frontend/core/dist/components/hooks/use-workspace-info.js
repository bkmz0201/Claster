import { WorkspacesService, } from '@affine/core/modules/workspace';
import { useLiveData, useService } from '@toeverything/infra';
import { useEffect } from 'react';
export function useWorkspaceInfo(meta) {
    const workspacesService = useService(WorkspacesService);
    const profile = meta ? workspacesService.getProfile(meta) : undefined;
    useEffect(() => {
        profile?.revalidate();
    }, [meta, profile]);
    return useLiveData(profile?.profile$);
}
export function useWorkspaceName(meta) {
    const information = useWorkspaceInfo(meta);
    return information?.name;
}
//# sourceMappingURL=use-workspace-info.js.map