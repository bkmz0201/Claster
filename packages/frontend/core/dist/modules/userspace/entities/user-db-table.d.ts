import type { DocFrontendDocState } from '@affine/nbstore';
import type { Table as OrmTable, TableSchemaBuilder } from '@toeverything/infra';
import { Entity, LiveData } from '@toeverything/infra';
import type { UserDBEngine } from './user-db-engine';
export declare class UserDBTable<Schema extends TableSchemaBuilder> extends Entity<{
    table: OrmTable<Schema>;
    storageDocId: string;
    engine: UserDBEngine;
}> {
    readonly table: OrmTable<Schema>;
    readonly docFrontend: import("@affine/nbstore").DocFrontend;
    docSyncState$: LiveData<DocFrontendDocState>;
    isSyncing$: LiveData<boolean>;
    isLoaded$: LiveData<boolean>;
    create: typeof this.table.create;
    update: typeof this.table.update;
    get: typeof this.table.get;
    get$: typeof this.table.get$;
    find: typeof this.table.find;
    find$: typeof this.table.find$;
    keys: typeof this.table.keys;
    delete: typeof this.table.delete;
}
//# sourceMappingURL=user-db-table.d.ts.map