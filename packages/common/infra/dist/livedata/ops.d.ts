import { Observable, type ObservableInput, type ObservedValueOf, type OperatorFunction } from 'rxjs';
import type { LiveData } from './livedata';
/**
 * An operator that maps the value to the `LiveData`.
 */
export declare function mapInto<T>(l$: LiveData<T>): import("rxjs").UnaryFunction<Observable<T>, Observable<never>>;
/**
 * An operator that catches the error and sends it to the `LiveData`.
 *
 * The `LiveData` will be set to `null` when the observable completes. This is useful for error state recovery.
 *
 * @param cb A callback that will be called when an error occurs.
 */
export declare function catchErrorInto<Error = any>(l$: LiveData<Error | null>, cb?: (error: Error) => void): import("rxjs").UnaryFunction<Observable<unknown>, Observable<unknown>>;
/**
 * An operator that calls the callback when the observable starts.
 */
export declare function onStart<T>(cb: () => void): OperatorFunction<T, T>;
/**
 * An operator that calls the callback when the observable completes.
 */
export declare function onComplete<T>(cb: () => void): OperatorFunction<T, T>;
/**
 * Convert a promise to an observable.
 *
 * like `from` but support `AbortSignal`.
 */
export declare function fromPromise<T>(promise: Promise<T> | ((signal: AbortSignal) => Promise<T>)): Observable<T>;
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
export declare function smartRetry<T>({ count, delay, maxDelay, }?: {
    count?: number;
    delay?: number;
    maxDelay?: number;
}): (obs$: Observable<T>) => Observable<T>;
/**
 * An operator that combines `exhaustMap` and `switchMap`.
 *
 * This operator executes the `comparator` on each input, acting as an `exhaustMap` when the `comparator` returns `true`
 * and acting as a `switchMap` when the comparator returns `false`.
 *
 * It is more useful for async processes that are relatively stable in results but sensitive to input.
 * For example, when requesting the user's subscription status, `exhaustMap` is used because the user's subscription
 * does not change often, but when switching users, the request should be made immediately like `switchMap`.
 *
 * @param onSwitch callback will be executed when `switchMap` occurs (including the first execution).
 */
export declare function exhaustMapSwitchUntilChanged<T, O extends ObservableInput<any>>(comparator: (previous: T, current: T) => boolean, project: (value: T, index: number) => O, onSwitch?: (value: T) => void): OperatorFunction<T, ObservedValueOf<O>>;
//# sourceMappingURL=ops.d.ts.map