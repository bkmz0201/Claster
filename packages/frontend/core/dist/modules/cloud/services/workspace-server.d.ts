import { Service } from '@toeverything/infra';
import type { Server } from '../entities/server';
export declare class WorkspaceServerService extends Service {
    server: Server | null;
    bindServer(server: Server): void;
}
//# sourceMappingURL=workspace-server.d.ts.map