import { Entity, LiveData } from '@toeverything/infra';
import { combineLatest, map, of, switchMap } from 'rxjs';
export class WorkspaceList extends Entity {
    workspace$(id) {
        return this.workspaces$.map(workspaces => workspaces.find(workspace => workspace.id === id));
    }
    constructor(flavoursService) {
        super();
        this.flavoursService = flavoursService;
        this.workspaces$ = LiveData.from(this.flavoursService.flavours$.pipe(switchMap(flavours => combineLatest(flavours.map(flavour => flavour.workspaces$)).pipe(map(workspaces => workspaces.flat())))), []);
        this.isRevalidating$ = LiveData.from(this.flavoursService.flavours$.pipe(switchMap(flavours => combineLatest(flavours.map(flavour => flavour.isRevalidating$ ?? of(false))).pipe(map(isLoadings => isLoadings.some(isLoading => isLoading))))), false);
    }
    revalidate() {
        this.flavoursService.flavours$.value.forEach(provider => {
            provider.revalidate?.();
        });
    }
    waitForRevalidation(signal) {
        this.revalidate();
        return this.isRevalidating$.waitFor(isLoading => !isLoading, signal);
    }
}
//# sourceMappingURL=list.js.map