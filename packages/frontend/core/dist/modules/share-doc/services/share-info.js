import { Service } from '@toeverything/infra';
import { ShareInfo } from '../entities/share-info';
export class ShareInfoService extends Service {
    constructor() {
        super(...arguments);
        this.shareInfo = this.framework.createEntity(ShareInfo);
    }
}
//# sourceMappingURL=share-info.js.map