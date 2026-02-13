import { Service } from '@toeverything/infra';
import { WorkspaceEngine } from '../entities/engine';
export class WorkspaceEngineService extends Service {
    get engine() {
        if (!this._engine) {
            this._engine = this.framework.createEntity(WorkspaceEngine, {
                isSharedMode: this.workspaceScope.props.openOptions.isSharedMode,
                engineWorkerInitOptions: this.workspaceScope.props.engineWorkerInitOptions,
            });
        }
        return this._engine;
    }
    constructor(workspaceScope) {
        super();
        this.workspaceScope = workspaceScope;
        this._engine = null;
    }
    dispose() {
        this._engine?.dispose();
        this._engine = null;
        super.dispose();
    }
}
//# sourceMappingURL=engine.js.map