import { Observable } from 'rxjs';
/**
 * Convert a promise to an observable.
 *
 * like `from` but support `AbortSignal`.
 */
export declare function fromPromise<T>(promise: Promise<T> | ((signal: AbortSignal) => Promise<T>)): Observable<T>;
//# sourceMappingURL=from-promise.d.ts.map