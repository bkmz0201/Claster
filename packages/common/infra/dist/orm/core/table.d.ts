import { Observable } from 'rxjs';
import type { DBAdapter } from './adapters';
import type { DBSchemaBuilder, DocumentTableSchemaBuilder, FieldSchemaBuilder, TableSchema, TableSchemaBuilder } from './schema';
import type { TableOptions } from './types';
type Pretty<T> = T extends any ? {
    -readonly [P in keyof T]: T[P];
} : never;
type TableDefinedFieldNames<T extends TableSchemaBuilder> = keyof {
    [K in keyof T as K extends `__${string}` ? never : K]: T[K];
};
type Typeof<F extends FieldSchemaBuilder> = F extends FieldSchemaBuilder<infer Type> ? Type : never;
type RequiredFields<T extends TableSchemaBuilder> = {
    [K in TableDefinedFieldNames<T> as T[K] extends FieldSchemaBuilder<any, infer Optional> ? Optional extends false ? K : never : never]: Typeof<T[K]>;
};
type OptionalFields<T extends TableSchemaBuilder> = {
    [K in TableDefinedFieldNames<T> as T[K] extends FieldSchemaBuilder<any, infer Optional> ? Optional extends true ? K : never : never]?: Typeof<T[K]> | null;
};
type PrimaryKeyField<T extends TableSchemaBuilder> = {
    [K in TableDefinedFieldNames<T>]: T[K] extends FieldSchemaBuilder<any, any, infer PrimaryKey> ? PrimaryKey extends true ? K : never : never;
}[TableDefinedFieldNames<T>];
type TableDefinedEntity<T extends TableSchemaBuilder> = Pretty<RequiredFields<T> & OptionalFields<T> & {
    [PrimaryKey in PrimaryKeyField<T>]: Typeof<T[PrimaryKey]>;
}>;
type MaybeDocumentEntityWrapper<Schema, Ty> = Schema extends DocumentTableSchemaBuilder ? Ty & {
    [key: string]: any;
} : Ty;
type NonPrimaryKeyFieldNames<T extends TableSchemaBuilder> = {
    [K in TableDefinedFieldNames<T>]: T[K] extends FieldSchemaBuilder<any, any, infer PrimaryKey> ? PrimaryKey extends false ? K : never : never;
}[TableDefinedFieldNames<T>];
export type PrimaryKeyFieldType<T extends TableSchemaBuilder> = Typeof<T[PrimaryKeyField<T>]>;
export type CreateEntityInput<T extends TableSchemaBuilder> = Pretty<MaybeDocumentEntityWrapper<T, RequiredFields<T> & OptionalFields<T>>>;
export type Entity<T extends TableSchemaBuilder> = Pretty<MaybeDocumentEntityWrapper<T, TableDefinedEntity<T>>>;
export type UpdateEntityInput<T extends TableSchemaBuilder> = Pretty<MaybeDocumentEntityWrapper<T, {
    [key in NonPrimaryKeyFieldNames<T>]?: key extends keyof TableDefinedEntity<T> ? TableDefinedEntity<T>[key] : never;
}>>;
export type FindEntityInput<T extends TableSchemaBuilder> = Pretty<MaybeDocumentEntityWrapper<T, {
    [key in TableDefinedFieldNames<T>]?: key extends keyof TableDefinedEntity<T> ? TableDefinedEntity<T>[key] | {
        not: TableDefinedEntity<T>[key] | null;
    } | null : never;
}>>;
export declare class Table<T extends TableSchemaBuilder> {
    readonly name: string;
    private readonly opts;
    readonly schema: TableSchema;
    readonly keyField: string;
    private readonly adapter;
    readonly isDocumentTable: boolean;
    private readonly subscribedKeys;
    constructor(db: DBAdapter, name: string, opts: TableOptions);
    create(input: CreateEntityInput<T>): Entity<T>;
    update(key: PrimaryKeyFieldType<T>, input: UpdateEntityInput<T>): Entity<T> | null;
    get(key: PrimaryKeyFieldType<T>): Entity<T> | null;
    get$(key: PrimaryKeyFieldType<T>): Observable<Entity<T> | null>;
    find(where?: FindEntityInput<T>): Entity<T>[];
    find$(where?: FindEntityInput<T>): Observable<Entity<T>[]>;
    select<Key extends keyof Entity<T>>(selectKey: Key, where?: FindEntityInput<T>): Pick<Entity<T>, Key | PrimaryKeyField<T>>[];
    select$<Key extends keyof Entity<T>>(selectKey: Key, where?: FindEntityInput<T>): Observable<Pick<Entity<T>, Key | PrimaryKeyField<T>>[]>;
    keys(): PrimaryKeyFieldType<T>[];
    keys$(): Observable<PrimaryKeyFieldType<T>[]>;
    delete(key: PrimaryKeyFieldType<T>): void;
}
export type TableMap<Tables extends DBSchemaBuilder> = {
    readonly [K in keyof Tables]: Table<Tables[K]>;
};
export {};
//# sourceMappingURL=table.d.ts.map