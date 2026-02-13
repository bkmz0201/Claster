import { Entity, LiveData } from '@toeverything/infra';
import { distinctUntilChanged, map } from 'rxjs';
export class WorkspaceDBTable extends Entity {
    constructor(workspaceService) {
        super();
        this.workspaceService = workspaceService;
        this.table = this.props.table;
        this.isReady$ = LiveData.from(this.workspaceService.workspace.engine.doc
            .docState$(this.props.storageDocId)
            .pipe(map(docState => docState.ready), distinctUntilChanged()), false);
        this.isSyncing$ = LiveData.from(this.workspaceService.workspace.engine.doc
            .docState$(this.props.storageDocId)
            .pipe(map(docState => docState.syncing), distinctUntilChanged()), false);
        this.isLoading$ = LiveData.from(this.workspaceService.workspace.engine.doc
            .docState$(this.props.storageDocId)
            .pipe(map(docState => !docState.loaded)), false);
        this.create = this.table.create.bind(this.table);
        this.update = this.table.update.bind(this.table);
        this.get = this.table.get.bind(this.table);
        // eslint-disable-next-line rxjs/finnish
        this.get$ = this.table.get$.bind(this.table);
        this.find = this.table.find.bind(this.table);
        // eslint-disable-next-line rxjs/finnish
        this.find$ = this.table.find$.bind(this.table);
        this.select = this.table.select.bind(this.table);
        // eslint-disable-next-line rxjs/finnish
        this.select$ = this.table.select$.bind(this.table);
        this.keys = this.table.keys.bind(this.table);
        this.delete = this.table.delete.bind(this.table);
    }
}
//# sourceMappingURL=table.js.map