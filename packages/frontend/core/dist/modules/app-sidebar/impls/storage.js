import { wrapMemento } from '@toeverything/infra';
export class AppSidebarStateImpl {
    constructor(globalState) {
        this.wrapped = wrapMemento(globalState, `app-sidebar-state:`);
    }
    keys() {
        return this.wrapped.keys();
    }
    get(key) {
        return this.wrapped.get(key);
    }
    watch(key) {
        return this.wrapped.watch(key);
    }
    set(key, value) {
        return this.wrapped.set(key, value);
    }
    del(key) {
        return this.wrapped.del(key);
    }
    clear() {
        return this.wrapped.clear();
    }
}
//# sourceMappingURL=storage.js.map