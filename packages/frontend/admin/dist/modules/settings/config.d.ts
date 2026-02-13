import type { ComponentType } from 'react';
import CONFIG_DESCRIPTORS from '../../config.json';
import type { ConfigInputProps } from './config-input-row';
export type ConfigType = 'String' | 'Number' | 'Boolean' | 'JSON' | 'Enum';
type ConfigDescriptor = {
    desc: string;
    type: ConfigType;
    env?: string;
    link?: string;
};
export type AppConfig = Record<string, Record<string, any>>;
type AppConfigDescriptors = typeof CONFIG_DESCRIPTORS;
type AppConfigModule = keyof AppConfigDescriptors;
type ModuleConfigDescriptors<M extends AppConfigModule> = AppConfigDescriptors[M];
type ConfigGroup<T extends AppConfigModule> = {
    name: string;
    module: T;
    fields: Array<keyof ModuleConfigDescriptors<T> | ({
        key: keyof ModuleConfigDescriptors<T>;
        sub?: string;
        desc?: string;
    } & Partial<ConfigInputProps>)>;
    operations?: ComponentType<{
        appConfig: AppConfig;
    }>[];
};
export declare const KNOWN_CONFIG_GROUPS: (ConfigGroup<"server"> | ConfigGroup<"auth"> | ConfigGroup<"mailer"> | ConfigGroup<"storages"> | ConfigGroup<"oauth"> | ConfigGroup<"copilot">)[];
export declare const UNKNOWN_CONFIG_GROUPS: {
    name: Capitalize<string>;
    module: string;
    fields: string[];
    operations: undefined;
}[];
export declare const ALL_SETTING_GROUPS: (ConfigGroup<"server"> | ConfigGroup<"auth"> | ConfigGroup<"mailer"> | ConfigGroup<"storages"> | ConfigGroup<"oauth"> | ConfigGroup<"copilot"> | {
    name: Capitalize<string>;
    module: string;
    fields: string[];
    operations: undefined;
})[];
export declare const ALL_CONFIG_DESCRIPTORS: Record<string, Record<string, ConfigDescriptor>>;
export {};
//# sourceMappingURL=config.d.ts.map