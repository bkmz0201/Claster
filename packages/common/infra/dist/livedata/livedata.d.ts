import { type ReadonlySignal } from '@preact/signals-core';
import type { InteropObservable, Observer, OperatorFunction, Subscription, TeardownLogic, ThrottleConfig } from 'rxjs';
import { Observable } from 'rxjs';
/**
 * LiveData is a reactive data type.
 *
 * ## basic usage
 *
 * @example
 * ```ts
 * const livedata = new LiveData(0); // create livedata with initial value
 *
 * livedata.next(1); // update value
 *
 * console.log(livedata.value); // get current value
 *
 * livedata.subscribe(v => { // subscribe to value changes
 *  console.log(v); // 1
 * });
 * ```
 *
 * ## observable
 *
 * LiveData is a rxjs observable, you can use rxjs operators.
 *
 * @example
 * ```ts
 * new LiveData(0).pipe(
 *   map(v => v + 1),
 *   filter(v => v > 1),
 *   ...
 * )
 * ```
 *
 * NOTICE: different from normal observable, LiveData will always emit the latest value when you subscribe to it.
 *
 * ## from observable
 *
 * LiveData can be created from observable or from other livedata.
 *
 * @example
 * ```ts
 * const A = LiveData.from(
 *   of(1, 2, 3, 4), // from observable
 *   0 // initial value
 * );
 *
 * const B = LiveData.from(
 *   A.pipe(map(v => 'from a ' + v)), // from other livedata
 *   '' // initial value
 * );
 * ```
 *
 * ## Why is it called LiveData
 *
 * This API is very similar to LiveData in Android, as both are based on Observable, so I named it LiveData.
 *
 * @see {@link https://rxjs.dev/api/index/class/BehaviorSubject}
 * @see {@link https://developer.android.com/topic/libraries/architecture/livedata}
 */
export declare class LiveData<T = unknown> extends Observable<T> implements InteropObservable<T> {
    static from<T>(upstream$: Observable<T> | InteropObservable<T> | ((stream: Observable<LiveDataOperation>) => Observable<T>), initialValue: T): LiveData<T>;
    static fromSignal<T>(signal: ReadonlySignal<T>): LiveData<T>;
    private static GLOBAL_COMPUTED_RECURSIVE_COUNT;
    /**
     * @example
     * ```ts
     * const a = new LiveData('v1');
     * const v1 = new LiveData(100);
     * const v2 = new LiveData(200);
     *
     * const v = LiveData.computed(get => {
     *   return get(a) === 'v1' ? get(v1) : get(v2);
     * });
     *
     * expect(v.value).toBe(100);
     * ```
     */
    static computed<T>(compute: (get: <L>(data: LiveData<L>) => L) => T): LiveData<T>;
    private readonly raw$;
    private readonly ops$;
    private readonly upstreamSubscription;
    /**
     * When the upstream Observable of livedata throws an error, livedata will enter poisoned state. This is an
     * unrecoverable abnormal state. Any operation on livedata will throw a PoisonedError.
     *
     * Since the development specification for livedata is not to throw any error, entering the poisoned state usually
     * means a programming error.
     */
    private isPoisoned;
    private poisonedError;
    private _signal;
    private _signalSubscription;
    constructor(initialValue: T, upstream?: ((upstream: Observable<LiveDataOperation>) => Observable<T>) | undefined);
    getValue: () => T;
    setValue: (v: T) => void;
    get value(): T;
    set value(v: T);
    get signal(): ReadonlySignal<T>;
    next: (v: T) => void;
    subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
    subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
    map<R>(mapper: (v: T) => R): LiveData<R>;
    /**
     * same as map, but do shallow equal check before emit
     */
    selector<R>(selector: (v: T) => R): LiveData<R>;
    distinctUntilChanged(comparator?: (previous: T, current: T) => boolean): LiveData<T>;
    throttleTime(duration: number, { trailing, leading }?: ThrottleConfig): LiveData<T>;
    asObservable(): Observable<T>;
    pipe(): Observable<T>;
    pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
    pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
    pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
    pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
    pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
    pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
    complete(): void;
    /**
     * flatten the livedata
     *
     * ```
     * new LiveData(new LiveData(0)).flat() // LiveData<number>
     * ```
     *
     * ```
     * new LiveData([new LiveData(0)]).flat() // LiveData<number[]>
     * ```
     */
    flat(): Flat<this>;
    static flat<T>(v: T): Flat<LiveData<T>>;
    waitFor(predicate: (v: T) => unknown, signal?: AbortSignal): Promise<T>;
    waitForNonNull(signal?: AbortSignal): Promise<NonNullable<T>>;
    reactSubscribe: (cb: () => void) => () => void;
    reactGetSnapshot: () => T;
    protected _subscribe(): TeardownLogic;
    [Symbol.observable](): this;
}
export type LiveDataOperation = 'set' | 'get' | 'watch' | 'unwatch';
export type Unwrap<T> = T extends LiveData<infer Z> ? Unwrap<Z> : T extends readonly [...infer Elements] ? {
    [K in keyof Elements]: Unwrap<Elements[K]>;
} : T;
export type Flat<T> = T extends LiveData<infer P> ? LiveData<Unwrap<P>> : T;
export declare class PoisonedError extends Error {
    constructor(originalError: any);
}
//# sourceMappingURL=livedata.d.ts.map