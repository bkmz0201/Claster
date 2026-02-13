import type { DBAdapter } from '../types';
import { MemoryTableAdapter } from './table';
export declare class MemoryORMAdapter implements DBAdapter {
    table(tableName: string): MemoryTableAdapter;
}
//# sourceMappingURL=db.d.ts.map