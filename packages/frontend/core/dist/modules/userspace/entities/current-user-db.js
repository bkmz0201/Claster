import { Entity, LiveData } from '@toeverything/infra';
import { Observable, of, switchMap } from 'rxjs';
export class CurrentUserDB extends Entity {
    constructor(userDBService, authService) {
        super();
        this.userDBService = userDBService;
        this.authService = authService;
        this.db$ = LiveData.from(this.authService.session.account$
            .selector(a => a?.id)
            .pipe(switchMap(userId => {
            if (userId) {
                const ref = this.userDBService.openDB(userId);
                return new Observable(subscriber => {
                    subscriber.next(ref.obj);
                    return () => {
                        ref.release();
                    };
                });
            }
            else {
                return of(null);
            }
        })), null);
    }
}
//# sourceMappingURL=current-user-db.js.map