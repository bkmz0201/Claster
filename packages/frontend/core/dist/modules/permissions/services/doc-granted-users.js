import { DocRole } from '@affine/graphql';
import { catchErrorInto, effect, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { EMPTY, exhaustMap, tap } from 'rxjs';
export class DocGrantedUsersService extends Service {
    constructor(store, workspaceService, docService) {
        super();
        this.store = store;
        this.workspaceService = workspaceService;
        this.docService = docService;
        this.PAGE_SIZE = 8;
        this.nextCursor$ = new LiveData(undefined);
        this.hasMore$ = new LiveData(true);
        this.grantedUserCount$ = new LiveData(0);
        this.grantedUsers$ = new LiveData([]);
        this.isLoading$ = new LiveData(false);
        this.error$ = new LiveData(null);
        this.loadMore = effect(exhaustMap(() => {
            if (!this.hasMore$.value) {
                return EMPTY;
            }
            return fromPromise(async (signal) => {
                return await this.store.fetchDocGrantedUsersList(this.workspaceService.workspace.id, this.docService.doc.id, {
                    first: this.PAGE_SIZE,
                    after: this.nextCursor$.value,
                }, signal);
            }).pipe(tap(({ edges, pageInfo, totalCount }) => {
                this.grantedUsers$.next([
                    ...this.grantedUsers$.value,
                    ...edges.map(edge => edge.node),
                ]);
                this.grantedUserCount$.next(totalCount);
                this.hasMore$.next(pageInfo.hasNextPage);
                this.nextCursor$.next(pageInfo.endCursor ?? undefined);
            }), smartRetry(), catchErrorInto(this.error$), onStart(() => {
                this.isLoading$.setValue(true);
            }), onComplete(() => this.isLoading$.setValue(false)));
        }));
    }
    reset() {
        this.grantedUsers$.setValue([]);
        this.grantedUserCount$.setValue(0);
        this.hasMore$.setValue(true);
        this.nextCursor$.setValue(undefined);
        this.isLoading$.setValue(false);
        this.error$.setValue(null);
        this.loadMore.reset();
    }
    async grantUsersRole(userIds, role) {
        await this.store.grantDocUserRoles({
            docId: this.docService.doc.id,
            workspaceId: this.workspaceService.workspace.id,
            userIds,
            role,
        });
        this.grantedUsers$.next(this.grantedUsers$.value.map(user => {
            if (userIds.includes(user.user.id)) {
                return { ...user, role };
            }
            return user;
        }));
    }
    async revokeUsersRole(userId) {
        await this.store.revokeDocUserRoles(this.workspaceService.workspace.id, this.docService.doc.id, userId);
        this.grantedUsers$.next(this.grantedUsers$.value.filter(user => user.user.id !== userId));
        if (this.grantedUserCount$.value > 0) {
            this.grantedUserCount$.next(this.grantedUserCount$.value - 1);
        }
    }
    async updateUserRole(userId, role) {
        const res = await this.store.updateDocUserRole(this.workspaceService.workspace.id, this.docService.doc.id, userId, role);
        if (res) {
            if (role === DocRole.Owner) {
                this.reset();
                this.loadMore();
                return res;
            }
            this.grantedUsers$.next(this.grantedUsers$.value.map(user => {
                if (user.user.id === userId) {
                    return { ...user, role };
                }
                return user;
            }));
        }
        return res;
    }
    async updateDocDefaultRole(role) {
        return await this.store.updateDocDefaultRole({
            docId: this.docService.doc.id,
            workspaceId: this.workspaceService.workspace.id,
            role,
        });
    }
    dispose() {
        this.loadMore.unsubscribe();
    }
}
//# sourceMappingURL=doc-granted-users.js.map