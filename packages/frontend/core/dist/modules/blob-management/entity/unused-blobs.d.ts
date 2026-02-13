import type { ListedBlobRecord } from '@affine/nbstore';
import { Entity, LiveData } from '@toeverything/infra';
import type { DocsSearchService } from '../../docs-search';
import type { WorkspaceService } from '../../workspace';
import type { WorkspaceFlavoursService } from '../../workspace/services/flavours';
interface HydratedBlobRecord extends ListedBlobRecord, Disposable {
    url: string;
    extension?: string;
    type?: string;
}
export declare class UnusedBlobs extends Entity {
    private readonly flavoursService;
    private readonly workspaceService;
    private readonly docsSearchService;
    constructor(flavoursService: WorkspaceFlavoursService, workspaceService: WorkspaceService, docsSearchService: DocsSearchService);
    isLoading$: LiveData<boolean>;
    unusedBlobs$: LiveData<ListedBlobRecord[]>;
    readonly revalidate: import("@toeverything/infra").Effect<unknown>;
    private get flavourProvider();
    listBlobs(): Promise<ListedBlobRecord[] | undefined>;
    getBlob(blobKey: string): Promise<Blob | null | undefined>;
    deleteBlob(blob: string, permanent: boolean): Promise<void>;
    getUnusedBlobs(abortSignal?: AbortSignal): Promise<ListedBlobRecord[]>;
    private getUsedBlobs;
    hydrateBlob(record: ListedBlobRecord, abortSignal?: AbortSignal): Promise<HydratedBlobRecord | null>;
}
export {};
//# sourceMappingURL=unused-blobs.d.ts.map