import { type AsyncMemento, type Memento } from '@toeverything/infra';
/**
 * A memento object that stores the entire application state.
 *
 * State is persisted, even the application is closed.
 */
export interface GlobalState extends Memento {
}
export declare const GlobalState: import("@toeverything/infra").Identifier<GlobalState> & ((variant: string) => import("@toeverything/infra").Identifier<GlobalState>);
/**
 * A memento object that stores the entire application cache.
 *
 * Cache may be deleted from time to time, business logic should not rely on cache.
 */
export interface GlobalCache extends Memento {
}
export declare const GlobalCache: import("@toeverything/infra").Identifier<GlobalCache> & ((variant: string) => import("@toeverything/infra").Identifier<GlobalCache>);
/**
 * A memento object that stores session state.
 *
 * Session state is not persisted, it will be cleared when the application is closed. (thinking about sessionStorage)
 */
export interface GlobalSessionState extends Memento {
}
export declare const GlobalSessionState: import("@toeverything/infra").Identifier<GlobalSessionState> & ((variant: string) => import("@toeverything/infra").Identifier<GlobalSessionState>);
export interface CacheStorage extends AsyncMemento {
}
export declare const CacheStorage: import("@toeverything/infra").Identifier<CacheStorage> & ((variant: string) => import("@toeverything/infra").Identifier<CacheStorage>);
//# sourceMappingURL=global.d.ts.map