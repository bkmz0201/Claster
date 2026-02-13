import type { Observable } from 'rxjs';
/**
 * A memento represents a storage utility. It can store and retrieve values, and observe changes.
 */
export interface Memento {
    get<T>(key: string): T | undefined;
    watch<T>(key: string): Observable<T | undefined>;
    set<T>(key: string, value: T | undefined): void;
    del(key: string): void;
    clear(): void;
    keys(): string[];
}
/**
 * A simple implementation of Memento. Used for testing.
 */
export declare class MemoryMemento implements Memento {
    private readonly data;
    setAll(init: Record<string, any>): void;
    private getLiveData;
    get<T>(key: string): T | undefined;
    watch<T>(key: string): Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    keys(): string[];
    clear(): void;
    del(key: string): void;
}
export declare function wrapMemento(memento: Memento, prefix: string): Memento;
//# sourceMappingURL=memento.d.ts.map