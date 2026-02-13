import { DebugLogger } from '@affine/debug';
import { effect, Entity, fromPromise, LiveData, onComplete, onStart, } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { catchError, EMPTY, exhaustMap, tap } from 'rxjs';
const logger = new DebugLogger('affine:workspace-profile');
/**
 * # WorkspaceProfile
 *
 * This class take care of workspace avatar and name
 */
export class WorkspaceProfile extends Entity {
    get id() {
        return this.props.metadata.id;
    }
    constructor(cache, flavoursService) {
        super();
        this.cache = cache;
        this.profile$ = LiveData.from(this.cache.watchProfileCache(this.props.metadata.id), null);
        this.avatar$ = this.profile$.map(v => v?.avatar);
        this.name$ = this.profile$.map(v => v?.name);
        this.isLoading$ = new LiveData(false);
        this.revalidate = effect(exhaustMap(() => {
            const provider = this.provider;
            if (!provider) {
                return EMPTY;
            }
            return fromPromise(signal => provider.getWorkspaceProfile(this.props.metadata.id, signal)).pipe(tap(info => {
                if (info) {
                    this.setProfile({ ...this.profile$.value, ...info });
                }
            }), catchError(err => {
                logger.error(err);
                return EMPTY;
            }), onStart(() => this.isLoading$.next(true)), onComplete(() => this.isLoading$.next(false)));
        }));
        this.provider =
            flavoursService.flavours$.value.find(p => p.flavour === this.props.metadata.flavour) ?? null;
    }
    setProfile(info) {
        if (isEqual(this.profile$.value, info)) {
            return;
        }
        this.cache.setProfileCache(this.props.metadata.id, info);
    }
    syncWithWorkspace(workspace) {
        workspace.name$.subscribe(name => {
            const old = this.profile$.value;
            this.setProfile({ ...old, name: name ?? old?.name });
        });
        workspace.avatar$.subscribe(avatar => {
            const old = this.profile$.value;
            this.setProfile({ ...old, avatar: avatar ?? old?.avatar });
        });
    }
}
//# sourceMappingURL=profile.js.map