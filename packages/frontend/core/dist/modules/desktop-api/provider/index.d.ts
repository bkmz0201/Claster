import type { AppInfo, ClientEvents, ClientHandler, SharedStorage } from '@affine/electron-api';
export interface DesktopApiProvider {
    handler?: ClientHandler;
    events?: ClientEvents;
    sharedStorage?: SharedStorage;
    appInfo: AppInfo;
}
export declare const DesktopApiProvider: import("@toeverything/infra").Identifier<DesktopApiProvider> & ((variant: string) => import("@toeverything/infra").Identifier<DesktopApiProvider>);
//# sourceMappingURL=index.d.ts.map