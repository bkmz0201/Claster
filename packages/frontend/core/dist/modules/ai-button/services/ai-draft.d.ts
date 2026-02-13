import { Service } from '@toeverything/infra';
import type { CacheStorage, GlobalStateService } from '../../storage';
export interface CacheFile {
    name: string;
    size: number;
    type: string;
    cacheKey: string;
}
export interface AIDraftState {
    input: string;
    quote: string;
    markdown: string;
    images: File[];
}
export interface AIDraftGlobal {
    input: string;
    quote: string;
    markdown: string;
    images: CacheFile[];
}
export declare class AIDraftService extends Service {
    private readonly globalStateService;
    private readonly cacheStorage;
    private state;
    constructor(globalStateService: GlobalStateService, cacheStorage: CacheStorage);
    setDraft: (data: Partial<AIDraftState>) => Promise<void>;
    getDraft: () => Promise<AIDraftState>;
    private readonly saveDraft;
    private readonly initState;
    private readonly getState;
    private readonly getCacheKey;
    private readonly addFilesToCache;
    private readonly removeFilesFromCache;
    private readonly restoreFilesFromData;
}
//# sourceMappingURL=ai-draft.d.ts.map