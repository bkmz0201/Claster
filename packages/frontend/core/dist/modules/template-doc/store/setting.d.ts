import { LiveData, Store } from '@toeverything/infra';
import type { WorkspaceDBService } from '../../db';
import type { TemplateDocSettings } from '../type';
export declare class TemplateDocSettingStore extends Store {
    private readonly dbService;
    private readonly key;
    constructor(dbService: WorkspaceDBService);
    watchIsLoading(): LiveData<boolean>;
    watchSetting(): LiveData<TemplateDocSettings>;
    watchSettingKey<T extends keyof TemplateDocSettings>(key: T): LiveData<TemplateDocSettings[T] | undefined>;
    updateSetting<T extends keyof TemplateDocSettings>(key: T, value: TemplateDocSettings[T]): void;
}
//# sourceMappingURL=setting.d.ts.map