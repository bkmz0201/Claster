import { ObjectPool, Service } from '@toeverything/infra';
import { CurrentUserDB } from '../entities/current-user-db';
import { UserDB } from '../entities/user-db';
export class UserspaceService extends Service {
    constructor() {
        super(...arguments);
        this.pool = new ObjectPool({
            onDelete(obj) {
                obj.dispose();
            },
            onDangling(obj) {
                return obj.engine.canGracefulStop();
            },
        });
        this._currentUserDB = null;
    }
    get currentUserDB() {
        if (!this._currentUserDB) {
            this._currentUserDB = this.framework.createEntity(CurrentUserDB);
        }
        return this._currentUserDB;
    }
    openDB(userId) {
        const exists = this.pool.get(userId);
        if (exists) {
            return exists;
        }
        const db = this.framework.createEntity(UserDB, {
            userId,
        });
        return this.pool.put(userId, db);
    }
}
//# sourceMappingURL=userspace.js.map