import { LiveData, Service } from '@toeverything/infra';
import type { DesktopApiService } from '../../desktop-api';
import type { WorkspacesService } from '../../workspace';
export declare class BackupService extends Service {
    private readonly desktopApiService;
    private readonly workspacesService;
    constructor(desktopApiService: DesktopApiService, workspacesService: WorkspacesService);
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    pageBackupWorkspaces$: LiveData<{
        items: {
            id: string;
            name: string;
            avatar: Uint8Array | null;
            fileSize: number;
            updatedAt: Date;
            createdAt: Date;
            docCount: number;
            dbPath: string;
        }[];
    } | undefined>;
    readonly revalidate: import("@toeverything/infra").Effect<unknown>;
    recoverBackupWorkspace(dbPath: string): Promise<string | undefined>;
    deleteBackupWorkspace(backupWorkspaceId: string): Promise<void>;
    dispose(): void;
}
//# sourceMappingURL=index.d.ts.map