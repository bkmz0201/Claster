import { Service } from '@toeverything/infra';
import { DocBacklinks } from '../entities/doc-backlinks';
import { DocLinks } from '../entities/doc-links';
export class DocLinksService extends Service {
    constructor() {
        super(...arguments);
        this.backlinks = this.framework.createEntity(DocBacklinks);
        this.links = this.framework.createEntity(DocLinks);
    }
}
//# sourceMappingURL=doc-links.js.map