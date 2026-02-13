import type { useI18n } from '@affine/i18n';
import type { Workspace } from '@blocksuite/affine/store';
import type { useNavigateHelper } from '../components/hooks/use-navigate-helper';
import type { WorkspaceDialogService } from '../modules/dialogs';
import type { WorkbenchService } from '../modules/workbench';
export declare function registerAffineNavigationCommands({ t, docCollection, navigationHelper, workspaceDialogService, workbenchService, }: {
    t: ReturnType<typeof useI18n>;
    navigationHelper: ReturnType<typeof useNavigateHelper>;
    docCollection: Workspace;
    workspaceDialogService: WorkspaceDialogService;
    workbenchService?: WorkbenchService;
}): () => void;
//# sourceMappingURL=affine-navigation.d.ts.map