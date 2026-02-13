import { Observable } from 'rxjs';
import { MANUALLY_STOP } from './throw-if-aborted';
/**
 * Convert a promise to an observable.
 *
 * like `from` but support `AbortSignal`.
 */
export function fromPromise(promise) {
    return new Observable(subscriber => {
        const abortController = new AbortController();
        const rawPromise = promise instanceof Function ? promise(abortController.signal) : promise;
        rawPromise
            .then(value => {
            subscriber.next(value);
            subscriber.complete();
        })
            .catch(error => {
            subscriber.error(error);
        });
        return () => abortController.abort(MANUALLY_STOP);
    });
}
//# sourceMappingURL=from-promise.js.map