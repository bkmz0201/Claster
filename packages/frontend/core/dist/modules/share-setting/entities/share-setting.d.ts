import type { GetWorkspaceConfigQuery, InviteLink } from '@affine/graphql';
import { Entity, LiveData } from '@toeverything/infra';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceShareSettingStore } from '../stores/share-setting';
type EnableAi = GetWorkspaceConfigQuery['workspace']['enableAi'];
type EnableUrlPreview = GetWorkspaceConfigQuery['workspace']['enableUrlPreview'];
export declare class WorkspaceShareSetting extends Entity {
    private readonly workspaceService;
    private readonly store;
    enableAi$: LiveData<boolean | null>;
    enableUrlPreview$: LiveData<boolean | null>;
    inviteLink$: LiveData<InviteLink | null>;
    isLoading$: LiveData<boolean>;
    error$: LiveData<any>;
    constructor(workspaceService: WorkspaceService, store: WorkspaceShareSettingStore);
    revalidate: import("@toeverything/infra").Effect<unknown>;
    waitForRevalidation(signal?: AbortSignal): Promise<void>;
    setEnableUrlPreview(enableUrlPreview: EnableUrlPreview): Promise<void>;
    setEnableAi(enableAi: EnableAi): Promise<void>;
    dispose(): void;
}
export {};
//# sourceMappingURL=share-setting.d.ts.map