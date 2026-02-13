import { z } from 'zod';
export declare const appConfigSchema: z.ZodObject<{
    /** whether to show onboarding first */
    onBoarding: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    onBoarding: boolean;
}, {
    onBoarding?: boolean | undefined;
}>;
export type AppConfigSchema = z.infer<typeof appConfigSchema>;
export declare const defaultAppConfig: {
    onBoarding: boolean;
};
interface StorageOptions<T> {
    /** default config */
    config: T;
    get?: () => T;
    set?: (data: T) => void;
}
/**
 * Storage for app configuration, stored in memory by default
 */
declare class Storage<T extends object> {
    private _cfg;
    private readonly _id;
    private readonly _options;
    constructor(options: StorageOptions<T>);
    /**
     * update entire config
     * @param data
     */
    set(data: T): void;
    get(): T;
    get<K extends keyof T>(key: K): T[K];
    /**
     * update a key in config
     * @param key
     * @param value
     */
    patch(key: keyof T, value: any): void;
    get value(): T;
}
export declare class AppConfigStorage extends Storage<AppConfigSchema> {
}
export {};
//# sourceMappingURL=app-config-storage.d.ts.map