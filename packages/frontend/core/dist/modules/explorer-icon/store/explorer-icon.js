import { Store } from '@toeverything/infra';
export class ExplorerIconStore extends Store {
    constructor(dbService) {
        super();
        this.dbService = dbService;
    }
    watchIcon(type, id) {
        return this.dbService.db.explorerIcon.get$(`${type}:${id}`);
    }
    getIcon(type, id) {
        return this.dbService.db.explorerIcon.get(`${type}:${id}`);
    }
    setIcon(options) {
        const { where, id, icon } = options;
        // remove icon
        if (!icon) {
            return this.dbService.db.explorerIcon.delete(`${where}:${id}`);
        }
        // upsert icon
        return this.dbService.db.explorerIcon.create({
            id: `${where}:${id}`,
            icon,
        });
    }
}
//# sourceMappingURL=explorer-icon.js.map