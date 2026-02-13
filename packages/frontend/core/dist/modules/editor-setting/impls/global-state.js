import { Service } from '@toeverything/infra';
import { map } from 'rxjs';
const storageKey = 'editor-setting';
/**
 * just for testing, vary poor performance
 */
export class GlobalStateEditorSettingProvider extends Service {
    constructor(globalState) {
        super();
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
//# sourceMappingURL=global-state.js.map