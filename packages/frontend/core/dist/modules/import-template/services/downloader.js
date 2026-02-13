import { Service } from '@toeverything/infra';
import { TemplateDownloader } from '../entities/downloader';
export class TemplateDownloaderService extends Service {
    constructor() {
        super(...arguments);
        this.downloader = this.framework.createEntity(TemplateDownloader);
    }
}
//# sourceMappingURL=downloader.js.map