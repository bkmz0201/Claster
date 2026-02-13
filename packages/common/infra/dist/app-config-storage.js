import { z } from 'zod';
export const appConfigSchema = z.object({
    /** whether to show onboarding first */
    onBoarding: z.boolean().optional().default(true),
});
export const defaultAppConfig = appConfigSchema.parse({});
const _storage = {};
let _inMemoryId = 0;
/**
 * Storage for app configuration, stored in memory by default
 */
class Storage {
    constructor(options) {
        this._id = _inMemoryId++;
        this._options = {
            get: () => _storage[this._id],
            set: (data) => (_storage[this._id] = data),
            ...options,
        };
        this._cfg = this.get() ?? options.config;
    }
    /**
     * update entire config
     * @param data
     */
    set(data) {
        try {
            this._options.set(data);
        }
        catch (err) {
            console.error('failed to save config', err);
        }
        this._cfg = data;
    }
    /**
     * get config, if key is provided, return the value of the key
     * @param key
     * @returns
     */
    get(key) {
        if (!key) {
            try {
                const cfg = this._options.get();
                if (!cfg) {
                    this.set(this._options.config);
                    return this._options.config;
                }
                return cfg;
            }
            catch {
                return this._cfg;
            }
        }
        else {
            const fullConfig = this.get();
            // TODO(@catsjuice): handle key not found, set default value
            // if (!(key in fullConfig)) {}
            return fullConfig[key];
        }
    }
    /**
     * update a key in config
     * @param key
     * @param value
     */
    patch(key, value) {
        this.set({ ...this.get(), [key]: value });
    }
    get value() {
        return this.get();
    }
}
export class AppConfigStorage extends Storage {
}
//# sourceMappingURL=app-config-storage.js.map