import {} from './adapters';
import { Table } from './table';
import { validators } from './validators';
export class ORMClient {
    static { this.hooksMap = new Map(); }
    constructor(db, adapter) {
        this.db = db;
        this.adapter = adapter;
        this.tables = new Map();
        Object.entries(db).forEach(([tableName, tableSchema]) => {
            Object.defineProperty(this, tableName, {
                get: () => {
                    let table = this.tables.get(tableName);
                    if (!table) {
                        table = new Table(this.adapter, tableName, {
                            schema: tableSchema,
                            hooks: ORMClient.hooksMap.get(tableName),
                        });
                        this.tables.set(tableName, table);
                    }
                    return table;
                },
            });
        });
    }
    static defineHook(tableName, _desc, hook) {
        let hooks = this.hooksMap.get(tableName);
        if (!hooks) {
            hooks = [];
            this.hooksMap.set(tableName, hooks);
        }
        hooks.push(hook);
    }
}
export function createORMClient(db) {
    Object.entries(db).forEach(([tableName, schema]) => {
        validators.validateTableSchema(tableName, schema);
    });
    class ORMClientWithTables extends ORMClient {
        constructor(adapter) {
            super(db, adapter);
        }
    }
    return ORMClientWithTables;
}
//# sourceMappingURL=client.js.map