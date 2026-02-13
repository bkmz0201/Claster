import { Observable } from 'rxjs';
import { AbstractType as YAbstractType } from 'yjs';
/**
 * extract data from yjs type based on path, and return an observable.
 * observable will automatically update when yjs data changed.
 * if data is not exist on path, the observable will emit undefined.
 *
 * this function is optimized for deep watch performance.
 *
 * @example
 * yjsGetPath(yjs, 'pages.[0].id') -> get pages[0].id and emit when changed
 * yjsGetPath(yjs, 'pages.[0]').switchMap(yjsObserve) -> get pages[0] and emit when any of pages[0] or its children changed
 * yjsGetPath(yjs, 'pages.[0]').switchMap(yjsObserveDeep) -> get pages[0] and emit when pages[0] or any of its deep children changed
 */
export declare function yjsGetPath(yjs: YAbstractType<any>, path: string): Observable<unknown>;
/**
 * convert yjs type to observable.
 * observable will automatically update when yjs data changed.
 *
 * @example
 * yjsObserveDeep(yjs) -> emit when any of its deep children changed
 */
export declare function yjsObserveDeep(yjs?: any): Observable<unknown>;
/**
 * convert yjs type to observable.
 * observable will automatically update when data changed on the path.
 *
 * @example
 * yjsObservePath(yjs, 'pages.[0].id') -> only emit when pages[0].id changed
 * yjsObservePath(yjs, 'pages.*.tags') -> only emit when tags of any page changed
 */
export declare function yjsObservePath(yjs?: any, path?: string): Observable<unknown>;
/**
 * convert yjs type to observable.
 * observable will automatically update when yjs data changed.
 *
 * @example
 * yjsObserve(yjs) -> emit when yjs type changed
 */
export declare function yjsObserve(yjs?: any): Observable<unknown>;
//# sourceMappingURL=yjs-observable.d.ts.map