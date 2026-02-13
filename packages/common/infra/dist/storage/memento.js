import { LiveData } from '../livedata';
/**
 * A simple implementation of Memento. Used for testing.
 */
export class MemoryMemento {
    constructor() {
        this.data = new Map();
    }
    setAll(init) {
        for (const [key, value] of Object.entries(init)) {
            this.set(key, value);
        }
    }
    getLiveData(key) {
        let data$ = this.data.get(key);
        if (!data$) {
            data$ = new LiveData(undefined);
            this.data.set(key, data$);
        }
        return data$;
    }
    get(key) {
        return this.getLiveData(key).value;
    }
    watch(key) {
        return this.getLiveData(key).asObservable();
    }
    set(key, value) {
        this.getLiveData(key).next(value);
    }
    keys() {
        return Array.from(this.data)
            .filter(([_, v$]) => v$.value !== undefined)
            .map(([k]) => k);
    }
    clear() {
        this.data.clear();
    }
    del(key) {
        this.data.delete(key);
    }
}
export function wrapMemento(memento, prefix) {
    return {
        get(key) {
            return memento.get(prefix + key);
        },
        watch(key) {
            return memento.watch(prefix + key);
        },
        set(key, value) {
            memento.set(prefix + key, value);
        },
        keys() {
            return memento
                .keys()
                .filter(k => k.startsWith(prefix))
                .map(k => k.slice(prefix.length));
        },
        clear() {
            memento.keys().forEach(k => {
                if (k.startsWith(prefix)) {
                    memento.del(k);
                }
            });
        },
        del(key) {
            memento.del(prefix + key);
        },
    };
}
//# sourceMappingURL=memento.js.map