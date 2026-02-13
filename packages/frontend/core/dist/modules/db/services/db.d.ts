import { LiveData, ObjectPool, Service } from '@toeverything/infra';
import type { WorkspaceServerService } from '../../cloud';
import { AuthService } from '../../cloud/services/auth';
import type { WorkspaceService } from '../../workspace';
import { WorkspaceDB, type WorkspaceDBWithTables } from '../entities/db';
import { type AFFiNEWorkspaceDbSchema } from '../schema';
export declare class WorkspaceDBService extends Service {
    private readonly workspaceService;
    private readonly workspaceServerService;
    db: WorkspaceDBWithTables<AFFiNEWorkspaceDbSchema>;
    userdataDBPool: ObjectPool<string, WorkspaceDB<{
        readonly favorite: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly index: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
        };
        readonly settings: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly value: import("@toeverything/infra").FieldSchemaBuilder<any, false, false>;
        };
        readonly docIntegrationRef: {
            readonly id: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly type: import("@toeverything/infra").FieldSchemaBuilder<"readwise", false, false>;
            readonly integrationId: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
            readonly refMeta: import("@toeverything/infra").FieldSchemaBuilder<any, false, false>;
        };
    }>>;
    constructor(workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService);
    userdataDB(userId: (string & {}) | '__local__'): WorkspaceDBWithTables<{
        readonly favorite: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly index: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
        };
        readonly settings: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly value: import("@toeverything/infra").FieldSchemaBuilder<any, false, false>;
        };
        readonly docIntegrationRef: {
            readonly id: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly type: import("@toeverything/infra").FieldSchemaBuilder<"readwise", false, false>;
            readonly integrationId: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
            readonly refMeta: import("@toeverything/infra").FieldSchemaBuilder<any, false, false>;
        };
    }>;
    authService: AuthService | undefined;
    get userdataDB$(): LiveData<WorkspaceDBWithTables<{
        readonly favorite: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly index: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
        };
        readonly settings: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly value: import("@toeverything/infra").FieldSchemaBuilder<any, false, false>;
        };
        readonly docIntegrationRef: {
            readonly id: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly type: import("@toeverything/infra").FieldSchemaBuilder<"readwise", false, false>;
            readonly integrationId: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
            readonly refMeta: import("@toeverything/infra").FieldSchemaBuilder<any, false, false>;
        };
    }>>;
    static isDBDocId(docId: string): boolean;
}
//# sourceMappingURL=db.d.ts.map