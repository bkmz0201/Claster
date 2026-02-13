import { Service } from '@toeverything/infra';
import { I18n } from '../entities/i18n';
export class I18nService extends Service {
    constructor() {
        super(...arguments);
        this.i18n = this.framework.createEntity(I18n);
    }
}
//# sourceMappingURL=i18n.js.map