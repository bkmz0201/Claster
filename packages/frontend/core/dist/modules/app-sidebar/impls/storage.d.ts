import { type Memento } from '@toeverything/infra';
import type { GlobalState } from '../../storage';
import type { AppSidebarState } from '../providers/storage';
export declare class AppSidebarStateImpl implements AppSidebarState {
    wrapped: Memento;
    constructor(globalState: GlobalState);
    keys(): string[];
    get<T>(key: string): T | undefined;
    watch<T>(key: string): import("rxjs").Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    clear(): void;
}
//# sourceMappingURL=storage.d.ts.map