import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { uniReactRoot } from '@affine/component';
import { AiLoginRequiredModal } from '@affine/core/components/affine/auth/ai-login-required';
import { useResponsiveSidebar } from '@affine/core/components/hooks/use-responsive-siedebar';
import { SWRConfigProvider } from '@affine/core/components/providers/swr-config-provider';
import { WorkspaceSideEffects } from '@affine/core/components/providers/workspace-side-effects';
import { AIIsland } from '@affine/core/desktop/components/ai-island';
import { AppContainer } from '@affine/core/desktop/components/app-container';
import { DocumentTitle } from '@affine/core/desktop/components/document-title';
import { WorkspaceDialogs } from '@affine/core/desktop/dialogs';
import { PeekViewManagerModal } from '@affine/core/modules/peek-view';
import { QuotaCheck } from '@affine/core/modules/quota';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { WorkspaceService } from '@affine/core/modules/workspace';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
export const WorkspaceLayout = function WorkspaceLayout({ children, }) {
    const currentWorkspace = useService(WorkspaceService).workspace;
    return (_jsxs(SWRConfigProvider, { children: [_jsx(WorkspaceDialogs, {}), currentWorkspace?.flavour !== 'local' ? (_jsx(QuotaCheck, { workspaceMeta: currentWorkspace.meta })) : null, _jsx(AiLoginRequiredModal, {}), _jsx(WorkspaceSideEffects, {}), _jsx(PeekViewManagerModal, {}), _jsx(DocumentTitle, {}), _jsx(WorkspaceLayoutInner, { children: children }), _jsx(AIIsland, {}), _jsx(uniReactRoot.Root, {})] }));
};
/**
 * Wraps the workspace layout main router view
 */
const WorkspaceLayoutUIContainer = ({ children }) => {
    const workbench = useService(WorkbenchService).workbench;
    const currentPath = useLiveData(LiveData.computed(get => {
        return get(workbench.basename$) + get(workbench.location$).pathname;
    }));
    useResponsiveSidebar();
    return (_jsx(AppContainer, { "data-current-path": currentPath, children: children }));
};
const WorkspaceLayoutInner = ({ children }) => {
    return _jsx(WorkspaceLayoutUIContainer, { children: children });
};
//# sourceMappingURL=workspace-layout.js.map