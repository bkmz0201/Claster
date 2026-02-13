import { type UpdateAppConfigInput } from '@affine/graphql';
import type { AppConfig } from './config';
export { type UpdateAppConfigInput };
export type AppConfigUpdates = Record<string, {
    from: any;
    to: any;
}>;
export declare const useAppConfig: () => {
    appConfig: AppConfig;
    patchedAppConfig: AppConfig;
    update: (path: string, value: any) => void;
    save: () => void;
    updates: AppConfigUpdates;
};
//# sourceMappingURL=use-app-config.d.ts.map