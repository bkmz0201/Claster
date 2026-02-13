import { DebugLogger } from '@affine/debug';
import { effect, exhaustMapWithTrailing, fromPromise, LiveData, Service, } from '@toeverything/infra';
import { catchError, distinctUntilChanged, EMPTY } from 'rxjs';
const logger = new DebugLogger('affine:navigation-gesture');
export class NavigationGestureService extends Service {
    constructor(navigationGestureProvider) {
        super();
        this.navigationGestureProvider = navigationGestureProvider;
        this.enabled$ = new LiveData(false);
        this.setEnabled = effect(distinctUntilChanged(), exhaustMapWithTrailing((enable) => {
            return fromPromise(async () => {
                if (!this.navigationGestureProvider) {
                    return;
                }
                if (enable) {
                    await this.enable();
                }
                else {
                    await this.disable();
                }
                return;
            }).pipe(catchError(err => {
                logger.error('navigationGestureProvider error', err);
                return EMPTY;
            }));
        }));
    }
    async enable() {
        this.enabled$.next(true);
        logger.debug(`Enable navigation gesture`);
        return this.navigationGestureProvider?.enable();
    }
    async disable() {
        this.enabled$.next(false);
        logger.debug(`Disable navigation gesture`);
        return this.navigationGestureProvider?.disable();
    }
}
//# sourceMappingURL=navigation-gesture.js.map