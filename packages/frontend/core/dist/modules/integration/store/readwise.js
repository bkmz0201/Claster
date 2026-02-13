import { LiveData, Store } from '@toeverything/infra';
import { exhaustMap } from 'rxjs';
import { AuthService } from '../../cloud';
import {} from '../type';
export class ReadwiseStore extends Store {
    constructor(globalState, workspaceService, workspaceServerService) {
        super();
        this.globalState = globalState;
        this.workspaceService = workspaceService;
        this.workspaceServerService = workspaceServerService;
        this.authService = this.workspaceServerService.server?.scope.get(AuthService);
        this.workspaceId = this.workspaceService.workspace.id;
        this.userId$ = this.workspaceService.workspace.meta.flavour === 'local' ||
            !this.authService
            ? new LiveData('__local__')
            : this.authService.session.account$.map(account => account?.id ?? '__local__');
    }
    _getKey({ userId, workspaceId, }) {
        return `readwise:${userId}:${workspaceId}`;
    }
    getUserId() {
        return this.workspaceService.workspace.meta.flavour === 'local' ||
            !this.authService
            ? '__local__'
            : (this.authService.session.account$.value?.id ?? '__local__');
    }
    storageKey$() {
        const workspaceId = this.workspaceService.workspace.id;
        return this.userId$.map(userId => this._getKey({ userId, workspaceId }));
    }
    getStorageKey() {
        const userId = this.getUserId();
        const workspaceId = this.workspaceService.workspace.id;
        return this._getKey({ userId, workspaceId });
    }
    watchSetting() {
        return this.storageKey$().pipe(exhaustMap(storageKey => {
            return this.globalState.watch(storageKey);
        }));
    }
    getSetting(key) {
        const config = this.globalState.get(this.getStorageKey());
        if (!key)
            return config;
        return config?.[key];
    }
    setSetting(key, value) {
        this.globalState.set(this.getStorageKey(), {
            ...this.getSetting(),
            [key]: value,
        });
    }
    setSettings(settings) {
        this.globalState.set(this.getStorageKey(), {
            ...this.getSetting(),
            ...settings,
        });
    }
}
//# sourceMappingURL=readwise.js.map