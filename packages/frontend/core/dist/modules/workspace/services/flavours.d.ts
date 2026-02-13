import { LiveData, Service } from '@toeverything/infra';
import type { WorkspaceFlavoursProvider } from '../providers/flavour';
export declare class WorkspaceFlavoursService extends Service {
    private readonly providers;
    constructor(providers: WorkspaceFlavoursProvider[]);
    flavours$: LiveData<import("..").WorkspaceFlavourProvider[]>;
}
//# sourceMappingURL=flavours.d.ts.map