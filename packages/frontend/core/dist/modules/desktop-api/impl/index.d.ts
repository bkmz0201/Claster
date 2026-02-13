import { Service } from '@toeverything/infra';
import type { DesktopApiProvider } from '../provider';
export declare class ElectronApiImpl extends Service implements DesktopApiProvider {
    constructor();
    handler: import("@affine/electron-api").ClientHandler | undefined;
    events: import("@affine/electron-api").ClientEvents | undefined;
    sharedStorage: {
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
    } | undefined;
    appInfo: {
        electron: boolean;
        windowName: string;
        viewId: string;
        scheme: "affine" | "affine-canary" | "affine-beta" | "affine-internal" | "affine-dev";
    };
}
//# sourceMappingURL=index.d.ts.map