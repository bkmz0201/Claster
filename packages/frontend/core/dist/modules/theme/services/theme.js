import { Service } from '@toeverything/infra';
import { AppTheme } from '../entities/theme';
export class AppThemeService extends Service {
    constructor() {
        super(...arguments);
        this.appTheme = this.framework.createEntity(AppTheme);
    }
}
//# sourceMappingURL=theme.js.map