import { catchErrorInto, effect, fromPromise, LiveData, onComplete, onStart, Service, smartRetry, } from '@toeverything/infra';
import { EMPTY, exhaustMap, tap } from 'rxjs';
export class NotificationListService extends Service {
    constructor(store, notificationCount) {
        super();
        this.store = store;
        this.notificationCount = notificationCount;
        this.isLoading$ = new LiveData(false);
        this.notifications$ = new LiveData([]);
        this.nextCursor$ = new LiveData(undefined);
        this.hasMore$ = new LiveData(true);
        this.error$ = new LiveData(null);
        this.PAGE_SIZE = 8;
        this.loadMore = effect(exhaustMap(() => {
            if (!this.hasMore$.value) {
                return EMPTY;
            }
            return fromPromise(signal => this.store.listNotification({
                first: this.PAGE_SIZE,
                after: this.nextCursor$.value,
            }, signal)).pipe(tap(result => {
                if (!result) {
                    // If the user is not logged in, we just ignore the result.
                    return;
                }
                const { edges, pageInfo, totalCount } = result;
                this.notifications$.next([
                    ...this.notifications$.value,
                    ...edges.map(edge => edge.node),
                ]);
                // keep the notification count in sync
                this.notificationCount.setCount(totalCount);
                this.hasMore$.next(pageInfo.hasNextPage);
                this.nextCursor$.next(pageInfo.endCursor ?? undefined);
            }), smartRetry(), catchErrorInto(this.error$), onStart(() => {
                this.isLoading$.setValue(true);
            }), onComplete(() => this.isLoading$.setValue(false)));
        }));
    }
    reset() {
        this.notifications$.setValue([]);
        this.hasMore$.setValue(true);
        this.nextCursor$.setValue(undefined);
        this.isLoading$.setValue(false);
        this.error$.setValue(null);
        this.loadMore.reset();
    }
    async readNotification(id) {
        await this.store.readNotification(id);
        this.notifications$.next(this.notifications$.value.filter(notification => notification.id !== id));
        this.notificationCount.setCount(Math.max(this.notificationCount.count$.value - 1, 0));
    }
    async readAllNotifications() {
        // optimistic clear all notifications
        this.reset();
        this.notificationCount.setCount(0);
        // avoid loading more notifications after clear all notifications
        this.hasMore$.setValue(false);
        try {
            await this.store.readAllNotifications();
        }
        catch (err) {
            // rollback the optimistic clear all notifications
            this.reset();
            this.loadMore();
            // rethrow the error to the caller, to notify the user
            throw err;
        }
    }
}
//# sourceMappingURL=list.js.map