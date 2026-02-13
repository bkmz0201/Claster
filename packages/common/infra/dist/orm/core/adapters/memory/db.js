import { MemoryTableAdapter } from './table';
export class MemoryORMAdapter {
    table(tableName) {
        return new MemoryTableAdapter(tableName);
    }
}
//# sourceMappingURL=db.js.map