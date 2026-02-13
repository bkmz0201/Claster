import { Service } from '@toeverything/infra';
import { EditorSetting, } from '../entities/editor-setting';
export class EditorSettingService extends Service {
    constructor() {
        super(...arguments);
        this.editorSetting = this.framework.createEntity(EditorSetting);
    }
}
//# sourceMappingURL=editor-setting.js.map