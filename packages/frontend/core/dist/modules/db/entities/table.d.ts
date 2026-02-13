import type { Table as OrmTable, TableSchemaBuilder } from '@toeverything/infra';
import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
export declare class WorkspaceDBTable<Schema extends TableSchemaBuilder> extends Entity<{
    table: OrmTable<Schema>;
    storageDocId: string;
}> {
    private readonly workspaceService;
    readonly table: OrmTable<Schema>;
    constructor(workspaceService: WorkspaceService);
    isReady$: LiveData<boolean>;
    isSyncing$: LiveData<boolean>;
    isLoading$: LiveData<boolean>;
    create: typeof this.table.create;
    update: typeof this.table.update;
    get: typeof this.table.get;
    get$: typeof this.table.get$;
    find: typeof this.table.find;
    find$: typeof this.table.find$;
    select: typeof this.table.select;
    select$: typeof this.table.select$;
    keys: typeof this.table.keys;
    delete: typeof this.table.delete;
}
//# sourceMappingURL=table.d.ts.map