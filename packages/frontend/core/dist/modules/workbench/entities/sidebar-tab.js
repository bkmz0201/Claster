import { Entity } from '@toeverything/infra';
export class SidebarTab extends Entity {
    constructor() {
        super(...arguments);
        this.id = this.props.id;
    }
}
//# sourceMappingURL=sidebar-tab.js.map