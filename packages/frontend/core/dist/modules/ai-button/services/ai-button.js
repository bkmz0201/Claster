import { DebugLogger } from '@affine/debug';
import { effect, exhaustMapWithTrailing, fromPromise, Service, } from '@toeverything/infra';
import { catchError, distinctUntilChanged, EMPTY, throttleTime } from 'rxjs';
const logger = new DebugLogger('AIButtonService');
export class AIButtonService extends Service {
    constructor(aiButtonProvider) {
        super();
        this.aiButtonProvider = aiButtonProvider;
        this.presentAIButton = effect(distinctUntilChanged(), throttleTime(1000), // throttle time to avoid frequent calls
        exhaustMapWithTrailing((present) => {
            return fromPromise(async () => {
                if (!this.aiButtonProvider) {
                    return;
                }
                if (present) {
                    await this.aiButtonProvider.presentAIButton();
                }
                else {
                    await this.aiButtonProvider.dismissAIButton();
                }
                return;
            }).pipe(catchError(err => {
                logger.error('presentAIButton error', err);
                return EMPTY;
            }));
        }));
    }
}
//# sourceMappingURL=ai-button.js.map