import { Service } from '@toeverything/infra';
import { CloudDocMeta } from '../entities/cloud-doc-meta';
export class CloudDocMetaService extends Service {
    constructor() {
        super(...arguments);
        this.cloudDocMeta = this.framework.createEntity(CloudDocMeta);
    }
}
//# sourceMappingURL=cloud-doc-meta.js.map