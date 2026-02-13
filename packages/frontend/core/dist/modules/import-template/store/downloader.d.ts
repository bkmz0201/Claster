import { Store } from '@toeverything/infra';
export declare class TemplateDownloaderStore extends Store {
    constructor();
    download(snapshotUrl: string): Promise<{
        data: Uint8Array<ArrayBuffer>;
    }>;
}
//# sourceMappingURL=downloader.d.ts.map