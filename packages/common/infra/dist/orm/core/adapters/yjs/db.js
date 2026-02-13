import { validators } from '../../validators';
import { YjsTableAdapter } from './table';
export class YjsDBAdapter {
    constructor(db, provider) {
        this.provider = provider;
        this.tables = new Map();
        for (const [tableName, table] of Object.entries(db)) {
            validators.validateYjsTableSchema(tableName, table);
            const doc = this.provider.getDoc(tableName);
            this.tables.set(tableName, new YjsTableAdapter(tableName, doc));
        }
    }
    table(tableName) {
        const table = this.tables.get(tableName);
        if (!table) {
            throw new Error('Table not found');
        }
        return table;
    }
}
//# sourceMappingURL=db.js.map