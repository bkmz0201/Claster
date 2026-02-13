import { effect, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { catchError, EMPTY, exhaustMap, groupBy, mergeMap, tap } from 'rxjs';
export class PublicUserService extends Service {
    constructor(store) {
        super();
        this.store = store;
        this.publicUsers$ = new LiveData(new Map());
        this.isLoadings$ = new LiveData(new Map());
        this.errors$ = new LiveData(new Map());
        this.revalidate = effect(groupBy((id) => id), mergeMap(id$ => id$.pipe(exhaustMap(id => fromPromise(async (signal) => {
            const user = await this.store.getPublicUserById(id, signal);
            if (!user) {
                return {
                    id,
                    removed: true,
                };
            }
            return {
                id,
                name: user.name,
                avatar: user.avatarUrl,
                avatarUrl: user.avatarUrl,
            };
        }).pipe(smartRetry(), catchError(error => {
            console.error(error);
            this.setError(id, error);
            return EMPTY;
        }), tap(user => {
            this.setPublicUser(id, user);
            this.setError(id, null); // clear error
        }), onStart(() => this.setLoading(id, true)), onComplete(() => this.setLoading(id, false)))))));
    }
    publicUser$(id) {
        return this.publicUsers$.selector(map => map.get(id) ?? null);
    }
    isLoading$(id) {
        return this.isLoadings$.selector(map => map.get(id) ?? false);
    }
    error$(id) {
        return this.errors$.selector(map => map.get(id));
    }
    setPublicUser(id, userInfo) {
        // Reusing the existing publicUsers Map instance instead of creating a new one.
        // While this doesn't follow immutability best practices, it reduces memory overhead
        // by avoiding the creation of new Map objects for each update.
        const publicUsers = this.publicUsers$.value;
        publicUsers.set(id, userInfo);
        this.publicUsers$.next(publicUsers);
    }
    setLoading(id, loading) {
        // Similar to setPublicUser, reusing the existing Map instance to reduce memory overhead
        const loadings = this.isLoadings$.value;
        loadings.set(id, loading);
        this.isLoadings$.next(loadings);
    }
    setError(id, error) {
        // Reusing the existing Map instance instead of creating a new one
        const errors = this.errors$.value;
        errors.set(id, error);
        this.errors$.next(errors);
    }
}
//# sourceMappingURL=public-user.js.map