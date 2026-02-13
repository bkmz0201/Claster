import { type DBAdapter, type Hook } from './adapters';
import type { DBSchemaBuilder } from './schema';
import { type CreateEntityInput, Table, type TableMap } from './table';
export declare class ORMClient {
    protected readonly db: DBSchemaBuilder;
    protected readonly adapter: DBAdapter;
    static hooksMap: Map<string, Hook<any>[]>;
    readonly tables: Map<string, Table<any>>;
    constructor(db: DBSchemaBuilder, adapter: DBAdapter);
    static defineHook(tableName: string, _desc: string, hook: Hook<any>): void;
}
export declare function createORMClient<Schema extends DBSchemaBuilder>(db: Schema): ORMClientWithTablesClass<Schema>;
export type ORMClientWithTablesClass<Schema extends DBSchemaBuilder> = {
    new (adapter: DBAdapter): TableMap<Schema> & ORMClient;
    defineHook<TableName extends keyof Schema>(tableName: TableName, desc: string, hook: Hook<CreateEntityInput<Schema[TableName]>>): void;
};
//# sourceMappingURL=client.d.ts.map