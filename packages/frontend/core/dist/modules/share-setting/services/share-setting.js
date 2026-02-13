import { Service } from '@toeverything/infra';
import { WorkspaceShareSetting } from '../entities/share-setting';
export class WorkspaceShareSettingService extends Service {
    constructor() {
        super(...arguments);
        this.sharePreview = this.framework.createEntity(WorkspaceShareSetting);
    }
}
//# sourceMappingURL=share-setting.js.map