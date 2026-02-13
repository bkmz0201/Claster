import { createORMClient, Entity, YjsDBAdapter } from '@toeverything/infra';
import { Doc as YDoc } from 'yjs';
import { USER_DB_SCHEMA } from '../schema';
import { UserDBEngine } from './user-db-engine';
import { UserDBTable } from './user-db-table';
const UserDBClient = createORMClient(USER_DB_SCHEMA);
export class UserDB extends Entity {
    constructor() {
        super();
        this.engine = this.framework.createEntity(UserDBEngine, {
            userId: this.props.userId,
        });
        this.db = new UserDBClient(new YjsDBAdapter(USER_DB_SCHEMA, {
            getDoc: guid => {
                const ydoc = new YDoc({
                    guid,
                });
                this.engine.client.docFrontend.connectDoc(ydoc);
                this.engine.client.docFrontend.addPriority(ydoc.guid, 50);
                return ydoc;
            },
        }));
        Object.entries(USER_DB_SCHEMA).forEach(([tableName]) => {
            const table = this.framework.createEntity(UserDBTable, {
                table: this.db[tableName],
                storageDocId: tableName,
                engine: this.engine,
            });
            Object.defineProperty(this, tableName, {
                get: () => table,
            });
        });
    }
    dispose() {
        this.engine.dispose();
    }
}
//# sourceMappingURL=user-db.js.map