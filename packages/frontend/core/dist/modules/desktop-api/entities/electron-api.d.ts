import { Entity } from '@toeverything/infra';
import type { DesktopApiProvider } from '../provider';
export declare class DesktopApi extends Entity {
    readonly provider: DesktopApiProvider;
    constructor(provider: DesktopApiProvider);
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
    get appInfo(): {
        electron: boolean;
        windowName: string;
        viewId: string;
        scheme: "affine" | "affine-canary" | "affine-beta" | "affine-internal" | "affine-dev";
    };
}
export declare class DesktopAppInfo extends Entity {
    readonly provider: DesktopApiProvider;
    constructor(provider: DesktopApiProvider);
}
//# sourceMappingURL=electron-api.d.ts.map