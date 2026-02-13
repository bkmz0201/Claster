import type { UpdateMeta } from '@affine/electron-api';
export declare const updateReadyAtom: import("jotai").Atom<UpdateMeta | Promise<UpdateMeta | null> | null>;
export declare const updateAvailableAtom: import("jotai").Atom<UpdateMeta | Promise<UpdateMeta | null> | null>;
export declare const downloadProgressAtom: import("jotai").Atom<number | Promise<number | null> | null>;
export declare const changelogCheckedAtom: import("jotai").WritableAtom<Record<string, boolean>, [Record<string, boolean> | typeof import("jotai/utils").RESET | ((prev: Record<string, boolean>) => Record<string, boolean> | typeof import("jotai/utils").RESET)], void>;
export declare const checkingForUpdatesAtom: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
export declare const currentVersionAtom: import("jotai").Atom<Promise<string | undefined>>;
export declare const useAppUpdater: () => {
    quitAndInstall: () => void;
    checkForUpdates: () => Promise<string | false | null | undefined>;
    downloadUpdate: () => void;
    toggleAutoDownload: (enable: boolean) => void;
    toggleAutoCheck: (enable: boolean) => void;
    appQuitting: boolean;
    checkingForUpdates: boolean;
    autoCheck: boolean;
    autoDownload: boolean;
    changelogUnread: boolean;
    openChangelog: () => void;
    dismissChangelog: () => void;
    updateReady: UpdateMeta | null;
    updateAvailable: UpdateMeta | null;
    downloadProgress: number | null;
    currentVersion: string | undefined;
};
//# sourceMappingURL=use-app-updater.d.ts.map