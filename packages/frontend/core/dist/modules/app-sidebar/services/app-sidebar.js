import { Service } from '@toeverything/infra';
import { GlobalState } from '../../storage';
import { AppSidebar } from '../entities/app-sidebar';
export class AppSidebarService extends Service {
    constructor() {
        super(...arguments);
        this.sidebar = this.framework.createEntity(AppSidebar, [GlobalState]);
    }
}
//# sourceMappingURL=app-sidebar.js.map