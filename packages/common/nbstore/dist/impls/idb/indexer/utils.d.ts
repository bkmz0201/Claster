import { type Observable, type ObservableInput, type OperatorFunction } from 'rxjs';
/**
 * Like exhaustMap, but also includes the trailing value emitted from the source observable while waiting for the preceding inner observable to complete
 *
 * Original code adapted from https://github.com/ReactiveX/rxjs/issues/5004
 * @param {function<T, K>(value: T, ?index: number): ObservableInput<K>} project - A function that, when applied to an item emitted by the
 * source Observable, returns a projected Observable.
 */
export declare function exhaustMapWithTrailing<T, R>(project: (value: T, index: number) => ObservableInput<R>): OperatorFunction<T, R>;
/**
 * An operator that retries the source observable when an error occurs.
 *
 * https://en.wikipedia.org/wiki/Exponential_backoff
 */
export declare function backoffRetry<T>({ when, count, delay, maxDelay, }?: {
    when?: (err: any) => boolean;
    count?: number;
    delay?: number;
    maxDelay?: number;
}): (obs$: Observable<T>) => Observable<T>;
//# sourceMappingURL=utils.d.ts.map