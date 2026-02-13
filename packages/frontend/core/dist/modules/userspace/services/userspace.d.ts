import { ObjectPool, Service } from '@toeverything/infra';
import { CurrentUserDB } from '../entities/current-user-db';
import { type UserDBWithTables } from '../entities/user-db';
export declare class UserspaceService extends Service {
    pool: ObjectPool<string, UserDBWithTables>;
    private _currentUserDB;
    get currentUserDB(): CurrentUserDB;
    openDB(userId: string): import("@toeverything/infra").RcRef<UserDBWithTables>;
}
//# sourceMappingURL=userspace.d.ts.map