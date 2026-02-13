import { type DBSchemaBuilder, Entity, type TableMap } from '@toeverything/infra';
import { WorkspaceDBTable } from './table';
export declare class WorkspaceDB<Schema extends DBSchemaBuilder> extends Entity<{
    db: TableMap<Schema>;
    schema: Schema;
    storageDocId: (tableName: string) => string;
}> {
    readonly db: TableMap<Schema>;
    constructor();
}
export type WorkspaceDBWithTables<Schema extends DBSchemaBuilder> = WorkspaceDB<Schema> & {
    [K in keyof Schema]: WorkspaceDBTable<Schema[K]>;
};
//# sourceMappingURL=db.d.ts.map