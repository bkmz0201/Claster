import { Service } from '@toeverything/infra';
import { WorkspaceEngine } from '../entities/engine';
import type { WorkspaceScope } from '../scopes/workspace';
export declare class WorkspaceEngineService extends Service {
    private readonly workspaceScope;
    private _engine;
    get engine(): WorkspaceEngine;
    constructor(workspaceScope: WorkspaceScope);
    dispose(): void;
}
//# sourceMappingURL=engine.d.ts.map