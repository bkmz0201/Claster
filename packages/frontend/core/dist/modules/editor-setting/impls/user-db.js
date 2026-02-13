import { Service } from '@toeverything/infra';
import { map, switchMap } from 'rxjs';
import { UserDBService } from '../../userspace';
export class CurrentUserDBEditorSettingProvider extends Service {
    constructor(serversService, globalState) {
        super();
        this.serversService = serversService;
        this.globalState = globalState;
        this.fallback = new GlobalStateEditorSettingProvider(this.globalState);
        const affineCloudServer = this.serversService.server$('affine-cloud').value; // TODO: support multiple servers
        if (!affineCloudServer) {
            throw new Error('affine-cloud server not found');
        }
        const userDBService = affineCloudServer.scope.get(UserDBService);
        this.currentUserDB$ = userDBService.currentUserDB.db$;
    }
    set(key, value) {
        if (this.currentUserDB$.value) {
            this.currentUserDB$.value?.editorSetting.create({
                key,
                value,
            });
        }
        else {
            this.fallback.set(key, value);
        }
    }
    get(key) {
        if (this.currentUserDB$.value) {
            return this.currentUserDB$.value?.editorSetting.get(key)?.value;
        }
        else {
            return this.fallback.get(key);
        }
    }
    watchAll() {
        return this.currentUserDB$.pipe(switchMap(db => {
            if (db) {
                return db.editorSetting.find$().pipe(map(settings => {
                    return settings.reduce((acc, setting) => {
                        acc[setting.key] = setting.value;
                        return acc;
                    }, {});
                }));
            }
            else {
                return this.fallback.watchAll();
            }
        }));
    }
}
const storageKey = 'editor-setting';
class GlobalStateEditorSettingProvider {
    constructor(globalState) {
        this.globalState = globalState;
    }
    set(key, value) {
        const all = this.globalState.get(storageKey) ?? {};
        const after = {
            ...all,
            [key]: value,
        };
        this.globalState.set(storageKey, after);
    }
    get(key) {
        return this.globalState.get(storageKey)?.[key];
    }
    watchAll() {
        return this.globalState
            .watch(storageKey)
            .pipe(map(all => all ?? {}));
    }
}
//# sourceMappingURL=user-db.js.map