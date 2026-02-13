import { Store } from '@toeverything/infra';
export class TemplateDownloaderStore extends Store {
    constructor() {
        super();
    }
    async download(snapshotUrl) {
        const response = await globalThis.fetch(snapshotUrl, {
            priority: 'high',
        });
        const arrayBuffer = await response.arrayBuffer();
        return { data: new Uint8Array(arrayBuffer) };
    }
}
//# sourceMappingURL=downloader.js.map