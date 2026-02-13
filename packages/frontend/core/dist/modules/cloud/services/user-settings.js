import { effect, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { catchError, EMPTY, tap } from 'rxjs';
export class UserSettingsService extends Service {
    constructor(store) {
        super();
        this.store = store;
        this.userSettings$ = new LiveData(undefined);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(undefined);
        this.revalidate = effect(exhaustMapWithTrailing(() => {
            return fromPromise(() => {
                return this.store.getUserSettings();
            }).pipe(smartRetry(), tap(settings => {
                this.userSettings$.value = settings;
            }), catchError(error => {
                this.error$.value = error;
                return EMPTY;
            }), onStart(() => {
                this.isLoading$.value = true;
            }), onComplete(() => {
                this.isLoading$.value = false;
            }));
        }));
    }
    async updateUserSettings(settings) {
        await this.store.updateUserSettings(settings);
        this.userSettings$.value = {
            ...this.userSettings$.value,
            ...settings,
        };
        this.revalidate();
    }
}
//# sourceMappingURL=user-settings.js.map