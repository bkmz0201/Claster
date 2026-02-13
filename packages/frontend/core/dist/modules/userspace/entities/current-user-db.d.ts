import { Entity, LiveData } from '@toeverything/infra';
import type { AuthService } from '../../cloud';
import type { UserspaceService } from '../services/userspace';
import type { UserDBWithTables } from './user-db';
export declare class CurrentUserDB extends Entity {
    private readonly userDBService;
    private readonly authService;
    constructor(userDBService: UserspaceService, authService: AuthService);
    db$: LiveData<UserDBWithTables | null>;
}
//# sourceMappingURL=current-user-db.d.ts.map