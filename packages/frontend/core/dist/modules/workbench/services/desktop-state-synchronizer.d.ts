import { Service } from '@toeverything/infra';
import type { DesktopApiService } from '../../desktop-api';
import type { PeekViewService } from '../../peek-view';
import type { WorkbenchService } from '../../workbench';
/**
 * Synchronize workbench state with state stored in main process
 */
export declare class DesktopStateSynchronizer extends Service {
    private readonly workbenchService;
    private readonly electronApi;
    private readonly peekViewService;
    constructor(workbenchService: WorkbenchService, electronApi: DesktopApiService, peekViewService: PeekViewService);
    startSync: () => void;
}
//# sourceMappingURL=desktop-state-synchronizer.d.ts.map