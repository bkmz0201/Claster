import { Service } from '@toeverything/infra';
import { TemplateDocList } from '../entities/list';
import { TemplateDocSetting } from '../entities/setting';
export class TemplateDocService extends Service {
    constructor() {
        super(...arguments);
        this.list = this.framework.createEntity(TemplateDocList);
        this.setting = this.framework.createEntity(TemplateDocSetting);
    }
}
//# sourceMappingURL=template-doc.js.map