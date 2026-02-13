import { LiveData, Service } from '@toeverything/infra';
import type { ServersService } from '../../cloud';
import type { GlobalState } from '../../storage';
import type { WorkspaceFlavourProvider, WorkspaceFlavoursProvider } from '../../workspace';
export declare class CloudWorkspaceFlavoursProvider extends Service implements WorkspaceFlavoursProvider {
    private readonly globalState;
    private readonly serversService;
    constructor(globalState: GlobalState, serversService: ServersService);
    workspaceFlavours$: LiveData<WorkspaceFlavourProvider[]>;
    private readonly pool;
}
export declare function isEmptyUpdate(binary: Uint8Array | undefined): boolean;
//# sourceMappingURL=cloud.d.ts.map