import { wrapMemento } from '@toeverything/infra';
export class WorkspaceLocalStateImpl {
    constructor(workspaceService, globalState) {
        this.wrapped = wrapMemento(globalState, `workspace-state:${workspaceService.workspace.id}:`);
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
export class WorkspaceLocalCacheImpl {
    constructor(workspaceService, globalCache) {
        this.wrapped = wrapMemento(globalCache, `workspace-cache:${workspaceService.workspace.id}:`);
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