import type { DeleteQuery, FindQuery, InsertQuery, ObserveQuery, Select, TableAdapter, TableAdapterOptions, UpdateQuery } from '../types';
export declare class MemoryTableAdapter implements TableAdapter {
    private readonly tableName;
    private readonly data;
    private keyField;
    private readonly subscriptions;
    constructor(tableName: string);
    setup(opts: TableAdapterOptions): void;
    dispose(): void;
    insert(query: InsertQuery): any;
    find(query: FindQuery): any[];
    observe(query: ObserveQuery): () => void;
    update(query: UpdateQuery): any[];
    delete(query: DeleteQuery): void;
    toObject(record: any): Record<string, any>;
    value(data: any, select?: Select): any;
    private iterate;
    private match;
    private dispatch;
}
//# sourceMappingURL=table.d.ts.map