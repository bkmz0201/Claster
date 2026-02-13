import { type Signal } from '@blocksuite/affine/shared/utils';
import { Service } from '@toeverything/infra';
import type { GlobalStateService } from '../../storage';
export interface AIToolsConfig {
    searchWorkspace?: boolean;
    readingDocs?: boolean;
}
export declare class AIToolsConfigService extends Service {
    private readonly globalStateService;
    constructor(globalStateService: GlobalStateService);
    config: Signal<AIToolsConfig>;
    private readonly config$;
    setConfig: (data: Partial<AIToolsConfig>) => void;
}
//# sourceMappingURL=tools-config.d.ts.map