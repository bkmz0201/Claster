import { Service } from '@toeverything/infra';
import { Workspace } from '../entities/workspace';
export class WorkspaceService extends Service {
    constructor() {
        super(...arguments);
        this._workspace = null;
    }
    get workspace() {
        if (!this._workspace) {
            this._workspace = this.framework.createEntity(Workspace);
        }
        return this._workspace;
    }
    dispose() {
        this._workspace?.dispose();
    }
}
//# sourceMappingURL=workspace.js.map