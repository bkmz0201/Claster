import { Observable } from 'rxjs';
import type { DesktopApiService } from '../../desktop-api';
import type { GlobalCache, GlobalState } from '../providers/global';
export declare class ElectronGlobalState implements GlobalState {
    private readonly electronApi;
    constructor(electronApi: DesktopApiService);
    keys(): string[];
    get<T>(key: string): T | undefined;
    watch<T>(key: string): Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    clear(): void;
}
export declare class ElectronGlobalCache implements GlobalCache {
    private readonly electronApi;
    constructor(electronApi: DesktopApiService);
    keys(): string[];
    get<T>(key: string): T | undefined;
    watch<T>(key: string): Observable<T | undefined>;
    set<T>(key: string, value: T): void;
    del(key: string): void;
    clear(): void;
}
//# sourceMappingURL=electron.d.ts.map