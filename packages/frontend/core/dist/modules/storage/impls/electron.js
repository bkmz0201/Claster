import { Observable } from 'rxjs';
export class ElectronGlobalState {
    constructor(electronApi) {
        this.electronApi = electronApi;
    }
    keys() {
        return this.electronApi.sharedStorage.globalState.keys();
    }
    get(key) {
        return this.electronApi.sharedStorage.globalState.get(key);
    }
    watch(key) {
        return new Observable(subscriber => {
            const unsubscribe = this.electronApi.sharedStorage.globalState.watch(key, i => {
                subscriber.next(i);
            });
            return () => unsubscribe();
        });
    }
    set(key, value) {
        this.electronApi.sharedStorage.globalState.set(key, value);
    }
    del(key) {
        this.electronApi.sharedStorage.globalState.del(key);
    }
    clear() {
        this.electronApi.sharedStorage.globalState.clear();
    }
}
export class ElectronGlobalCache {
    constructor(electronApi) {
        this.electronApi = electronApi;
    }
    keys() {
        return this.electronApi.sharedStorage.globalCache.keys();
    }
    get(key) {
        return this.electronApi.sharedStorage.globalCache.get(key);
    }
    watch(key) {
        return new Observable(subscriber => {
            const unsubscribe = this.electronApi.sharedStorage.globalCache.watch(key, i => {
                subscriber.next(i);
            });
            return () => unsubscribe();
        });
    }
    set(key, value) {
        this.electronApi.sharedStorage.globalCache.set(key, value);
    }
    del(key) {
        this.electronApi.sharedStorage.globalCache.del(key);
    }
    clear() {
        this.electronApi.sharedStorage.globalCache.clear();
    }
}
//# sourceMappingURL=electron.js.map