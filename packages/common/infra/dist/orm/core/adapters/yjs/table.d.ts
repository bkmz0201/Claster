import { type AbstractType, type Doc } from 'yjs';
import type { DeleteQuery, FindQuery, InsertQuery, ObserveQuery, TableAdapter, TableAdapterOptions, UpdateQuery } from '../types';
/**
 * Yjs Adapter for AFFiNE ORM
 *
 * Structure:
 *
 * Each table is a YDoc instance
 *
 * Table(YDoc)
 *   Key(string): Row(YMap)({
 *     FieldA(string): Value(Primitive)
 *     FieldB(string): Value(Primitive)
 *     FieldC(string): Value(Primitive)
 *   })
 */
export declare class YjsTableAdapter implements TableAdapter {
    private readonly tableName;
    private readonly doc;
    private readonly deleteFlagKey;
    private keyField;
    private fields;
    private readonly origin;
    constructor(tableName: string, doc: Doc);
    setup(opts: TableAdapterOptions): void;
    dispose(): void;
    insert(query: InsertQuery): any;
    update(query: UpdateQuery): any[];
    find(query: FindQuery): any[];
    observe(query: ObserveQuery): () => void;
    delete(query: DeleteQuery): void;
    toObject(ty: AbstractType<any>): Record<string, any>;
    private recordByKey;
    private iterate;
    private value;
    private match;
    private isDeleted;
    private keyof;
    private field;
    private setField;
    private isEmpty;
    private deleteTy;
}
//# sourceMappingURL=table.d.ts.map