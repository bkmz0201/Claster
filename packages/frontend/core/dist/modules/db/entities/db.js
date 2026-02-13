import { Entity, } from '@toeverything/infra';
import { WorkspaceDBTable } from './table';
export class WorkspaceDB extends Entity {
    constructor() {
        super();
        this.db = this.props.db;
        Object.entries(this.props.schema).forEach(([tableName]) => {
            const table = this.framework.createEntity(WorkspaceDBTable, {
                table: this.db[tableName],
                storageDocId: this.props.storageDocId(tableName),
            });
            Object.defineProperty(this, tableName, {
                get: () => table,
            });
        });
    }
}
//# sourceMappingURL=db.js.map