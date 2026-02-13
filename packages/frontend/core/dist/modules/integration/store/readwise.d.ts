import { LiveData, Store } from '@toeverything/infra';
import { AuthService, type WorkspaceServerService } from '../../cloud';
import type { GlobalState } from '../../storage';
import type { WorkspaceService } from '../../workspace';
import { type ReadwiseConfig } from '../type';
export declare class ReadwiseStore extends Store {
    private readonly globalState;
    private readonly workspaceService;
    private readonly workspaceServerService;
    constructor(globalState: GlobalState, workspaceService: WorkspaceService, workspaceServerService: WorkspaceServerService);
    private _getKey;
    authService: AuthService | undefined;
    workspaceId: string;
    userId$: LiveData<string>;
    getUserId(): string;
    storageKey$(): LiveData<string>;
    getStorageKey(): string;
    watchSetting(): import("rxjs").Observable<ReadwiseConfig | undefined>;
    getSetting(): ReadwiseConfig | undefined;
    getSetting<Key extends keyof ReadwiseConfig>(key: Key): ReadwiseConfig[Key] | undefined;
    setSetting<Key extends keyof ReadwiseConfig>(key: Key, value: ReadwiseConfig[Key]): void;
    setSettings(settings: Partial<ReadwiseConfig>): void;
}
//# sourceMappingURL=readwise.d.ts.map