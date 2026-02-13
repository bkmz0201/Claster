import { WorkspaceScope } from '../workspace';
import { GlobalDialogService } from './services/dialog';
import { WorkspaceDialogService } from './services/workspace-dialog';
export { GlobalDialogService } from './services/dialog';
export { WorkspaceDialogService } from './services/workspace-dialog';
export function configureDialogModule(framework) {
    framework
        .service(GlobalDialogService)
        .scope(WorkspaceScope)
        .service(WorkspaceDialogService);
}
//# sourceMappingURL=index.js.map