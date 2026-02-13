import { DebugLogger } from '@affine/debug';
import { signal } from '@preact/signals-core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, EMPTY, map, mergeMap, Observable, of, scan, skip, Subject, switchMap, throttleTime, } from 'rxjs';
import { shallowEqual } from '../utils/shallow-equal';
const logger = new DebugLogger('livedata');
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
export class LiveData extends Observable {
    static from(upstream$, initialValue) {
        const data$ = new LiveData(initialValue, typeof upstream$ === 'function'
            ? upstream$
            : stream$ => stream$.pipe(mergeMap(v => {
                if (v === 'set') {
                    return EMPTY;
                }
                else if (v === 'get') {
                    return of('watch', 'unwatch');
                }
                else {
                    return of(v);
                }
            }), scan((acc, op) => {
                if (op === 'watch') {
                    return acc + 1;
                }
                else if (op === 'unwatch') {
                    return acc - 1;
                }
                else {
                    return acc;
                }
            }, 0), map(count => {
                if (count > 0) {
                    return 'watch';
                }
                else {
                    return 'unwatch';
                }
            }), distinctUntilChanged(), switchMap(op => {
                if (op === 'watch') {
                    return upstream$;
                }
                else {
                    return EMPTY;
                }
            })));
        return data$;
    }
    static fromSignal(signal) {
        return LiveData.from(new Observable(subscriber => {
            const unsubscribe = signal.subscribe(value => {
                subscriber.next(value);
            });
            return () => {
                unsubscribe();
            };
        }), signal.value);
    }
    static { this.GLOBAL_COMPUTED_RECURSIVE_COUNT = 0; }
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
    static computed(compute) {
        return LiveData.from(new Observable(subscribe => {
            const execute = (next) => {
                const subscriptions = [];
                const getfn = (data$) => {
                    let value = null;
                    let first = true;
                    subscriptions.push(data$.subscribe({
                        error(err) {
                            subscribe.error(err);
                        },
                        next(v) {
                            value = v;
                            if (!first) {
                                next();
                            }
                            first = false;
                        },
                    }));
                    return value;
                };
                LiveData.GLOBAL_COMPUTED_RECURSIVE_COUNT++;
                try {
                    if (LiveData.GLOBAL_COMPUTED_RECURSIVE_COUNT > 10) {
                        subscribe.error(new Error('computed recursive limit exceeded'));
                    }
                    else {
                        subscribe.next(compute(getfn));
                    }
                }
                catch (err) {
                    subscribe.error(err);
                }
                finally {
                    LiveData.GLOBAL_COMPUTED_RECURSIVE_COUNT--;
                }
                return () => {
                    subscriptions.forEach(s => s.unsubscribe());
                };
            };
            let prev = () => { };
            const looper = () => {
                const dispose = execute(looper);
                prev();
                prev = dispose;
            };
            looper();
            return () => {
                prev();
            };
        }), null);
    }
    constructor(initialValue, upstream = undefined) {
        super();
        this.ops$ = new Subject();
        /**
         * When the upstream Observable of livedata throws an error, livedata will enter poisoned state. This is an
         * unrecoverable abnormal state. Any operation on livedata will throw a PoisonedError.
         *
         * Since the development specification for livedata is not to throw any error, entering the poisoned state usually
         * means a programming error.
         */
        this.isPoisoned = false;
        this.poisonedError = null;
        this.getValue = () => {
            if (this.isPoisoned) {
                throw this.poisonedError;
            }
            this.ops$.next('get');
            return this.raw$.value;
        };
        this.setValue = (v) => {
            if (this.isPoisoned) {
                throw this.poisonedError;
            }
            this.raw$.next(v);
            this.ops$.next('set');
        };
        this.next = (v) => {
            if (this.isPoisoned) {
                throw this.poisonedError;
            }
            return this.setValue(v);
        };
        this.reactSubscribe = (cb) => {
            if (this.isPoisoned) {
                throw this.poisonedError;
            }
            this.ops$.next('watch');
            const subscription = this.raw$
                .pipe(distinctUntilChanged(), skip(1))
                .subscribe(cb);
            subscription.add(() => {
                this.ops$.next('unwatch');
            });
            return () => subscription.unsubscribe();
        };
        this.reactGetSnapshot = () => {
            if (this.isPoisoned) {
                throw this.poisonedError;
            }
            this.ops$.next('watch');
            // eslint-disable-next-line @typescript-eslint/no-floating-promises -- never throw
            Promise.resolve().then(() => {
                this.ops$.next('unwatch');
            });
            return this.raw$.value;
        };
        this.raw$ = new BehaviorSubject(initialValue);
        if (upstream) {
            this.upstreamSubscription = upstream(this.ops$).subscribe({
                next: v => {
                    this.raw$.next(v);
                },
                complete: () => {
                    if (!this.raw$.closed) {
                        logger.error('livedata upstream unexpected complete');
                    }
                },
                error: err => {
                    logger.error('uncatched error in livedata', err);
                    this.isPoisoned = true;
                    this.poisonedError = new PoisonedError(err);
                    this.raw$.error(this.poisonedError);
                },
            });
        }
    }
    get value() {
        return this.getValue();
    }
    set value(v) {
        this.next(v);
    }
    get signal() {
        if (!this._signal) {
            this._signal = signal(this.value);
            this._signalSubscription = this.subscribe(v => {
                // oxlint-disable-next-line no-non-null-assertion
                this._signal.value = v;
            });
        }
        return this._signal;
    }
    subscribe(observerOrNext, error, complete) {
        this.ops$.next('watch');
        const subscription = this.raw$.subscribe(observerOrNext, error, complete);
        subscription.add(() => {
            this.ops$.next('unwatch');
        });
        return subscription;
    }
    map(mapper) {
        const sub$ = LiveData.from(new Observable(subscriber => this.subscribe({
            next: v => {
                subscriber.next(mapper(v));
            },
            complete: () => {
                sub$.complete();
            },
        })), undefined // is safe
        );
        return sub$;
    }
    /**
     * same as map, but do shallow equal check before emit
     */
    selector(selector) {
        const sub$ = LiveData.from(new Observable(subscriber => {
            let last = undefined;
            return this.subscribe({
                next: v => {
                    const data = selector(v);
                    if (!shallowEqual(last, data)) {
                        subscriber.next(data);
                    }
                    last = data;
                },
                complete: () => {
                    sub$.complete();
                },
            });
        }), undefined // is safe
        );
        return sub$;
    }
    distinctUntilChanged(comparator) {
        return LiveData.from(this.pipe(distinctUntilChanged(comparator)), null);
    }
    throttleTime(duration, { trailing = true, leading = true } = {}) {
        return LiveData.from(this.pipe(throttleTime(duration, undefined, { trailing, leading })), null);
    }
    asObservable() {
        return new Observable(subscriber => {
            return this.subscribe(subscriber);
        });
    }
    pipe(...args) {
        return new Observable(subscriber => {
            this.ops$.next('watch');
            const subscription = this.raw$.pipe
                .apply(this.raw$, args)
                .subscribe(subscriber);
            subscription.add(() => {
                this.ops$.next('unwatch');
            });
            return subscription;
        });
    }
    complete() {
        this.ops$.complete();
        this.raw$.complete();
        this.upstreamSubscription?.unsubscribe();
        this._signalSubscription?.unsubscribe();
    }
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
    flat() {
        return LiveData.from(this.pipe(switchMap(v => {
            if (v instanceof LiveData) {
                return v.flat();
            }
            else if (Array.isArray(v)) {
                if (v.length === 0) {
                    return of([]);
                }
                return combineLatest(v.map(v => {
                    if (v instanceof LiveData) {
                        return v.flat();
                    }
                    else {
                        return of(v);
                    }
                }));
            }
            else {
                return of(v);
            }
        })), null);
    }
    static flat(v) {
        return new LiveData(v).flat();
    }
    waitFor(predicate, signal) {
        return new Promise((resolve, reject) => {
            const subscription = this.subscribe(v => {
                if (predicate(v)) {
                    resolve(v);
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    Promise.resolve().then(() => {
                        subscription.unsubscribe();
                    });
                }
            });
            signal?.addEventListener('abort', reason => {
                subscription.unsubscribe();
                reject(reason);
            });
        });
    }
    waitForNonNull(signal) {
        return this.waitFor(v => v !== null && v !== undefined, signal);
    }
    _subscribe() {
        throw new Error('Method not implemented.');
    }
    [Symbol.observable || '@@observable']() {
        return this;
    }
    [Symbol.observable]() {
        return this;
    }
}
export class PoisonedError extends Error {
    constructor(originalError) {
        super('The livedata is poisoned, original error: ' +
            (originalError instanceof Error ? originalError.stack : originalError));
    }
}
//# sourceMappingURL=livedata.js.map