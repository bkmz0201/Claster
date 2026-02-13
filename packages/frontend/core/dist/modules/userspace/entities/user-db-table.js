import { Entity, LiveData } from '@toeverything/infra';
export class UserDBTable extends Entity {
    constructor() {
        super(...arguments);
        this.table = this.props.table;
        this.docFrontend = this.props.engine.client.docFrontend;
        this.docSyncState$ = LiveData.from(this.docFrontend.docState$(this.props.storageDocId), null);
        this.isSyncing$ = this.docSyncState$.map(docState => docState.syncing);
        this.isLoaded$ = this.docSyncState$.map(docState => docState.loaded);
        this.create = this.table.create.bind(this.table);
        this.update = this.table.update.bind(this.table);
        this.get = this.table.get.bind(this.table);
        // eslint-disable-next-line rxjs/finnish
        this.get$ = this.table.get$.bind(this.table);
        this.find = this.table.find.bind(this.table);
        // eslint-disable-next-line rxjs/finnish
        this.find$ = this.table.find$.bind(this.table);
        this.keys = this.table.keys.bind(this.table);
        this.delete = this.table.delete.bind(this.table);
    }
}
//# sourceMappingURL=user-db-table.js.map