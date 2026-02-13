import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { LiveData, Service } from '@toeverything/infra';
const AI_REASONING_KEY = 'AIReasoning';
export class AIReasoningService extends Service {
    constructor(globalStateService) {
        super();
        this.globalStateService = globalStateService;
        this._enabled$ = LiveData.from(this.globalStateService.globalState.watch(AI_REASONING_KEY), undefined);
        this.setEnabled = (enabled) => {
            this.globalStateService.globalState.set(AI_REASONING_KEY, enabled);
        };
        const { signal: enabled, cleanup: enabledCleanup } = createSignalFromObservable(this._enabled$, undefined);
        this.enabled = enabled;
        this.disposables.push(enabledCleanup);
    }
}
//# sourceMappingURL=reasoning.js.map