import { jsx as _jsx } from "react/jsx-runtime";
import { useWorkspace } from '@affine/core/components/hooks/use-workspace';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { WorkspacesService } from '@affine/core/modules/workspace';
import { FrameworkScope, useLiveData, useService } from '@toeverything/infra';
export const CurrentWorkspaceScopeProvider = ({ children, }) => {
    const globalContext = useService(GlobalContextService).globalContext;
    const workspacesService = useService(WorkspacesService);
    const workspaceMeta = useLiveData(workspacesService.list.workspaces$).find(workspace => workspace.id === globalContext.workspaceId.get());
    const workspace = useWorkspace(workspaceMeta);
    if (!workspace) {
        // todo(@pengx17): render a loading/error component here if not found?
        return null;
    }
    return _jsx(FrameworkScope, { scope: workspace.scope, children: children });
};
//# sourceMappingURL=current-workspace-scope.js.map