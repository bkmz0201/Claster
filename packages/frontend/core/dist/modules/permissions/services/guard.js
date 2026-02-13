import { backoffRetry, effect, exhaustMapWithTrailing, fromPromise, LiveData, Service, } from '@toeverything/infra';
import { combineLatest, exhaustMap, groupBy, map, mergeMap, Observable, } from 'rxjs';
export class GuardService extends Service {
    constructor(guardStore, workspaceService, workspacePermissionService) {
        super();
        this.guardStore = guardStore;
        this.workspaceService = workspaceService;
        this.workspacePermissionService = workspacePermissionService;
        this.workspacePermissions$ = new LiveData({});
        this.docPermissions$ = new LiveData({});
        this.isAdmin$ = LiveData.computed(get => {
            const isOwner = get(this.workspacePermissionService.permission.isOwner$);
            const isAdmin = get(this.workspacePermissionService.permission.isAdmin$);
            if (isOwner === null && isAdmin === null) {
                return null;
            }
            return isOwner || isAdmin;
        });
        this.revalidateWorkspacePermission = effect(exhaustMapWithTrailing(() => fromPromise(() => this.guardStore.getWorkspacePermissions()).pipe(backoffRetry({
            count: Infinity,
        }))));
        this.revalidateDocPermission = effect(groupBy((docId) => docId), mergeMap(doc$ => doc$.pipe(exhaustMap((docId) => fromPromise(() => this.loadDocPermission(docId)).pipe(backoffRetry({
            count: Infinity,
        }))))));
        this.loadWorkspacePermission = async () => {
            if (this.workspaceService.workspace.flavour === 'local') {
                return {};
            }
            if (this.workspaceService.workspace.openOptions.isSharedMode) {
                return {};
            }
            const permissions = await this.guardStore.getWorkspacePermissions();
            this.workspacePermissions$.next(permissions);
            return permissions;
        };
        this.loadDocPermission = async (docId) => {
            if (this.workspaceService.workspace.flavour === 'local') {
                return {};
            }
            if (this.workspaceService.workspace.openOptions.isSharedMode) {
                return {};
            }
            const permissions = await this.guardStore.getDocPermissions(docId);
            this.docPermissions$.next({
                ...this.docPermissions$.value,
                [docId]: permissions,
            });
            return permissions;
        };
    }
    /**
     * @example
     * ```ts
     * guardService.can$('Workspace_Properties_Update');
     * guardService.can$('Doc_Update', docId);
     * ```
     *
     * @returns LiveData<boolean | undefined> the value is undefined if the permission is loading
     */
    can$(action, ...args) {
        const docId = args[0];
        return LiveData.from(new Observable(subscriber => {
            let prev = undefined;
            const subscription = combineLatest([
                (docId
                    ? this.docPermissions$.pipe(map(permissions => permissions[docId] ?? {}))
                    : this.workspacePermissions$.asObservable()),
                this.isAdmin$,
            ]).subscribe(([permissions, isAdmin]) => {
                if (isAdmin) {
                    return subscriber.next(true);
                }
                const current = permissions[action] ?? undefined;
                if (current !== prev) {
                    prev = current;
                    subscriber.next(current);
                }
            });
            return () => {
                subscription.unsubscribe();
            };
        }), undefined);
    }
    async can(action, ...args) {
        const docId = args[0];
        if (this.isAdmin$.value === null) {
            await this.workspacePermissionService.permission.waitForRevalidation();
        }
        if (this.isAdmin$.value === true) {
            return true;
        }
        const permissions = await (docId
            ? this.loadDocPermission(docId)
            : this.loadWorkspacePermission());
        return permissions[action] ?? false;
    }
    revalidateCan(_action, ...args) {
        // revalidate workspace permission if it's not initialized
        if (this.isAdmin$.value === null) {
            this.workspacePermissionService.permission.revalidate();
        }
        if (this.isAdmin$.value === true) {
            // if the user is admin, the permission is always true
            return;
        }
        const docId = args[0];
        // revalidate permission
        if (docId) {
            this.revalidateDocPermission(docId);
        }
        else {
            this.revalidateWorkspacePermission();
        }
    }
    dispose() {
        this.revalidateWorkspacePermission.unsubscribe();
        this.revalidateDocPermission.unsubscribe();
    }
}
//# sourceMappingURL=guard.js.map