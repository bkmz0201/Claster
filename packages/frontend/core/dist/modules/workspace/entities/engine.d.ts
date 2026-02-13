import type { StoreClient, WorkerInitOptions } from '@affine/nbstore/worker/client';
import { Entity } from '@toeverything/infra';
import type { FeatureFlagService } from '../../feature-flag';
import type { NbstoreService } from '../../storage';
import type { WorkspaceService } from '../services/workspace';
export declare class WorkspaceEngine extends Entity<{
    isSharedMode?: boolean;
    engineWorkerInitOptions: WorkerInitOptions;
}> {
    private readonly workspaceService;
    private readonly nbstoreService;
    private readonly featureFlagService;
    client?: StoreClient;
    started: boolean;
    constructor(workspaceService: WorkspaceService, nbstoreService: NbstoreService, featureFlagService: FeatureFlagService);
    get doc(): import("@affine/nbstore").DocFrontend;
    get blob(): import("@affine/nbstore").BlobFrontend;
    get indexer(): import("@affine/nbstore").IndexerFrontend;
    get awareness(): import("@affine/nbstore").AwarenessFrontend;
    start(): void;
}
//# sourceMappingURL=engine.d.ts.map