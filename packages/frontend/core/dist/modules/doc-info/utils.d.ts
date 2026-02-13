import { Observable } from 'rxjs';
interface ReadonlySignal<T> {
    value: T;
    subscribe: (fn: (value: T) => void) => () => void;
}
export declare function signalToObservable<T>(signal: ReadonlySignal<T>): Observable<T>;
export declare function useSignalValue<T>(signal: ReadonlySignal<T>): T;
export declare function useSignalValue<T>(signal?: ReadonlySignal<T>): T | undefined;
export {};
//# sourceMappingURL=utils.d.ts.map