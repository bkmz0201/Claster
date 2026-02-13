import { mixpanel } from '@affine/track';
import { createEvent, Service } from '@toeverything/infra';
import { combineLatest, distinctUntilChanged, map, skip } from 'rxjs';
import { Workbench } from '../entities/workbench';
export const WorkbenchLocationChanged = createEvent('WorkbenchLocationChanged');
export class WorkbenchService extends Service {
    constructor() {
        super();
        this.workbench = this.framework.createEntity(Workbench);
        combineLatest([this.workbench.location$, this.workbench.basename$])
            .pipe(map(([location, basename]) => basename + location.pathname), distinctUntilChanged(), skip(1))
            .subscribe(newLocation => {
            this.eventBus.root.emit(WorkbenchLocationChanged, newLocation);
            mixpanel.track_pageview({
                location: newLocation,
            });
        });
    }
}
//# sourceMappingURL=workbench.js.map