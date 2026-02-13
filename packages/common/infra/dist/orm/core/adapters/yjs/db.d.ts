import type { Doc } from 'yjs';
import type { DBSchemaBuilder } from '../../schema';
import type { DBAdapter, TableAdapter } from '../types';
export interface DocProvider {
    getDoc(guid: string): Doc;
}
export declare class YjsDBAdapter implements DBAdapter {
    private readonly provider;
    tables: Map<string, TableAdapter>;
    constructor(db: DBSchemaBuilder, provider: DocProvider);
    table(tableName: string): TableAdapter;
}
//# sourceMappingURL=db.d.ts.map