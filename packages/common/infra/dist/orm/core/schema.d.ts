export type FieldType = 'string' | 'number' | 'boolean' | 'json' | 'enum';
export interface FieldSchema<Type = unknown> {
    type: FieldType;
    optional: boolean;
    isPrimaryKey: boolean;
    default?: () => Type;
    values?: Type[];
}
export type TableSchema = Record<string, FieldSchema>;
export type TableSchemaBuilder = Record<string, FieldSchemaBuilder<any, boolean>>;
export type DocumentTableSchemaBuilder = TableSchemaBuilder & {
    __document: FieldSchemaBuilder<boolean, true, false>;
};
export type DBSchemaBuilder = Record<string, TableSchemaBuilder>;
export declare class FieldSchemaBuilder<Type = unknown, Optional extends boolean = false, PrimaryKey extends boolean = false> {
    schema: FieldSchema;
    constructor(type: FieldType, values?: string[]);
    optional(): FieldSchemaBuilder<Type, true, PrimaryKey>;
    default(value: () => Type): FieldSchemaBuilder<Type, true, PrimaryKey>;
    primaryKey(): FieldSchemaBuilder<Type, Optional, true>;
}
export declare const f: {
    readonly string: () => FieldSchemaBuilder<string, false, false>;
    readonly number: () => FieldSchemaBuilder<number, false, false>;
    readonly boolean: () => FieldSchemaBuilder<boolean, false, false>;
    readonly json: <T = any>() => FieldSchemaBuilder<T, false, false>;
    readonly enum: <T extends string>(...values: T[]) => FieldSchemaBuilder<T, false, false>;
};
export declare const t: {
    document: <T extends TableSchemaBuilder>(schema: T) => T & {
        __document: FieldSchemaBuilder<boolean, true, false>;
    };
};
//# sourceMappingURL=schema.d.ts.map