import { LiveData, Service } from '@toeverything/infra';
export class ExplorerIconService extends Service {
    constructor(store) {
        super();
        this.store = store;
    }
    getIcon(type, id) {
        return this.store.getIcon(type, id);
    }
    setIcon(options) {
        return this.store.setIcon(options);
    }
    icon$(type, id) {
        return LiveData.from(this.store.watchIcon(type, id), null);
    }
}
//# sourceMappingURL=explorer-icon.js.map