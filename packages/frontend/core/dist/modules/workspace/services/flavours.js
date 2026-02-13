import { LiveData, Service } from '@toeverything/infra';
import { combineLatest, map } from 'rxjs';
export class WorkspaceFlavoursService extends Service {
    constructor(providers) {
        super();
        this.providers = providers;
        this.flavours$ = LiveData.from(combineLatest(this.providers.map(p => p.workspaceFlavours$)).pipe(map(flavours => flavours.flat())), []);
    }
}
//# sourceMappingURL=flavours.js.map