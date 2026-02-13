import { Service } from '@toeverything/infra';
import type { To } from 'history';
import type { DesktopApi } from '../entities/electron-api';
export declare class DesktopApiService extends Service {
    readonly api: DesktopApi;
    constructor(api: DesktopApi);
    get appInfo(): {
        electron: boolean;
        windowName: string;
        viewId: string;
        scheme: "affine" | "affine-canary" | "affine-beta" | "affine-internal" | "affine-dev";
    };
    get handler(): import("@affine/electron-api").ClientHandler;
    get events(): import("@affine/electron-api").ClientEvents;
    get sharedStorage(): {
        globalState: {
            del(key: string): void;
            clear(): void;
            get<T>(key: string): T | undefined;
            keys(): string[];
            set(key: string, value: unknown): void;
            watch<T>(key: string, cb: (i: T | undefined) => void): () => void;
        };
        globalCache: {
            del(key: string): void;
            clear(): void;
            get<T>(key: string): T | undefined;
            keys(): string[];
            set(key: string, value: unknown): void;
            watch<T>(key: string, cb: (i: T | undefined) => void): () => void;
        };
    };
    showTab(tabId: string, to?: To): Promise<void>;
    private setupStartListener;
    private setupCommonUIEvents;
    private setupAuthRequestEvent;
}
//# sourceMappingURL=desktop-api.d.ts.map