import { UserFriendlyError } from '@affine/error';
import { backoffRetry, effect, Entity, exhaustMapWithTrailing, fromPromise, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { tap } from 'rxjs';
import { validateAndReduceImage } from '../../../utils/reduce-image';
export class AuthSession extends Entity {
    constructor(store) {
        super();
        this.store = store;
        this.session$ = LiveData.from(this.store.watchCachedAuthSession(), null).map(session => session
            ? {
                status: 'authenticated',
                session: session,
            }
            : {
                status: 'unauthenticated',
            });
        this.status$ = this.session$.map(session => session.status);
        this.account$ = this.session$.map(session => session.status === 'authenticated' ? session.session.account : null);
        this.waitForAuthenticated = (signal) => this.session$.waitFor(session => session.status === 'authenticated', signal);
        this.isRevalidating$ = new LiveData(false);
        this.revalidate = effect(exhaustMapWithTrailing(() => fromPromise(() => this.getSession()).pipe(backoffRetry({
            count: Infinity,
        }), tap(sessionInfo => {
            if (!isEqual(this.store.getCachedAuthSession(), sessionInfo)) {
                this.store.setCachedAuthSession(sessionInfo);
            }
        }), onStart(() => {
            this.isRevalidating$.next(true);
        }), onComplete(() => {
            this.isRevalidating$.next(false);
        }))));
    }
    async getSession() {
        try {
            const session = await this.store.fetchSession();
            if (session?.user) {
                const account = {
                    id: session.user.id,
                    email: session.user.email,
                    label: session.user.name,
                    avatar: session.user.avatarUrl,
                    info: session.user,
                };
                const result = {
                    account,
                };
                return result;
            }
            else {
                return null;
            }
        }
        catch (e) {
            if (UserFriendlyError.fromAny(e).is('UNSUPPORTED_CLIENT_VERSION')) {
                return null;
            }
            throw e;
        }
    }
    async waitForRevalidation(signal) {
        this.revalidate();
        await this.isRevalidating$.waitFor(isRevalidating => !isRevalidating, signal);
    }
    async removeAvatar() {
        await this.store.removeAvatar();
        await this.waitForRevalidation();
    }
    async uploadAvatar(file) {
        const reducedFile = await validateAndReduceImage(file);
        await this.store.uploadAvatar(reducedFile);
        await this.waitForRevalidation();
    }
    async updateLabel(label) {
        await this.store.updateLabel(label);
        await this.waitForRevalidation();
    }
    dispose() {
        this.revalidate.unsubscribe();
    }
}
//# sourceMappingURL=session.js.map