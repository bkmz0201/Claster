import { Entity, LiveData } from '@toeverything/infra';
import type { TemplateDownloaderStore } from '../store/downloader';
export declare class TemplateDownloader extends Entity {
    private readonly store;
    constructor(store: TemplateDownloaderStore);
    readonly isDownloading$: LiveData<boolean>;
    readonly data$: LiveData<Uint8Array<ArrayBufferLike> | null>;
    readonly error$: LiveData<any>;
    readonly download: import("@toeverything/infra").Effect<{
        snapshotUrl: string;
    }>;
}
//# sourceMappingURL=downloader.d.ts.map