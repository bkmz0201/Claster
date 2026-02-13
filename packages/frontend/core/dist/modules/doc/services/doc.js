import { Service } from '@toeverything/infra';
import { Doc } from '../entities/doc';
export class DocService extends Service {
    constructor() {
        super(...arguments);
        this.doc = this.framework.createEntity(Doc);
    }
    dispose() {
        this.doc.dispose();
        super.dispose();
    }
}
//# sourceMappingURL=doc.js.map