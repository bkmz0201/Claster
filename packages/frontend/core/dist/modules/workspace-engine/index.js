import {} from '@toeverything/infra';
import { ServersService } from '../cloud/services/servers';
import { GlobalState } from '../storage';
import { WorkspaceFlavoursProvider } from '../workspace';
import { CloudWorkspaceFlavoursProvider } from './impls/cloud';
import { LOCAL_WORKSPACE_LOCAL_STORAGE_KEY, LocalWorkspaceFlavoursProvider, } from './impls/local';
export { base64ToUint8Array, uint8ArrayToBase64 } from './utils/base64';
export function configureBrowserWorkspaceFlavours(framework) {
    framework
        .impl(WorkspaceFlavoursProvider('LOCAL'), LocalWorkspaceFlavoursProvider)
        .impl(WorkspaceFlavoursProvider('CLOUD'), CloudWorkspaceFlavoursProvider, [
        GlobalState,
        ServersService,
    ]);
}
/**
 * a hack for directly add local workspace to workspace list
 * Used after copying sqlite database file to appdata folder
 */
export function _addLocalWorkspace(id) {
    const allWorkspaceIDs = JSON.parse(localStorage.getItem(LOCAL_WORKSPACE_LOCAL_STORAGE_KEY) ?? '[]');
    allWorkspaceIDs.push(id);
    localStorage.setItem(LOCAL_WORKSPACE_LOCAL_STORAGE_KEY, JSON.stringify(allWorkspaceIDs));
}
//# sourceMappingURL=index.js.map