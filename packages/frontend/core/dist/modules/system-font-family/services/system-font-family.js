import { Service } from '@toeverything/infra';
import { SystemFontFamily } from '../entities/system-font-family';
export class SystemFontFamilyService extends Service {
    constructor() {
        super(...arguments);
        this.systemFontFamily = this.framework.createEntity(SystemFontFamily);
    }
}
//# sourceMappingURL=system-font-family.js.map