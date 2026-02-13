import { Store } from '@toeverything/infra';
import type { Observable } from 'rxjs';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceServerService } from '../services/workspace-server';
export declare class DocCreatedByUpdatedBySyncStore extends Store {
    private readonly workspaceServerService;
    private readonly workspaceService;
    constructor(workspaceServerService: WorkspaceServerService, workspaceService: WorkspaceService);
    getDocCreatedByUpdatedByList(afterCursor?: string | null): Promise<import("@affine/graphql").GetDocCreatedByUpdatedByListQuery>;
    watchDocCreatedByUpdatedBySynced(): Observable<boolean>;
    setDocCreatedByUpdatedBySynced(synced: boolean): void;
}
//# sourceMappingURL=doc-created-by-updated-by-sync.d.ts.map