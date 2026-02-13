import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { LiveData, Service } from '@toeverything/infra';
import { map } from 'rxjs';
const AI_TOOLS_CONFIG_KEY = 'AIToolsConfig';
export class AIToolsConfigService extends Service {
    constructor(globalStateService) {
        super();
        this.globalStateService = globalStateService;
        this.config$ = LiveData.from(this.globalStateService.globalState.watch(AI_TOOLS_CONFIG_KEY), undefined).pipe(map(config => ({
            searchWorkspace: config?.searchWorkspace ?? true,
            readingDocs: config?.readingDocs ?? true,
        })));
        this.setConfig = (data) => {
            this.globalStateService.globalState.set(AI_TOOLS_CONFIG_KEY, {
                ...this.config.value,
                ...data,
            });
        };
        const { signal, cleanup: enabledCleanup } = createSignalFromObservable(this.config$, {
            searchWorkspace: true,
            readingDocs: true,
        });
        this.config = signal;
        this.disposables.push(enabledCleanup);
    }
}
//# sourceMappingURL=tools-config.js.map