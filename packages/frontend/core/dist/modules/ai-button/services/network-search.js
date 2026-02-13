import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { LiveData, Service } from '@toeverything/infra';
const AI_NETWORK_SEARCH_KEY = 'AINetworkSearch';
export class AINetworkSearchService extends Service {
    constructor(globalStateService, featureFlagService) {
        super();
        this.globalStateService = globalStateService;
        this.featureFlagService = featureFlagService;
        this._visible$ = this.featureFlagService.flags.enable_ai_network_search.$;
        this._enabled$ = LiveData.from(this.globalStateService.globalState.watch(AI_NETWORK_SEARCH_KEY), undefined);
        this.setEnabled = (enabled) => {
            this.globalStateService.globalState.set(AI_NETWORK_SEARCH_KEY, enabled);
        };
        const { signal: enabled, cleanup: enabledCleanup } = createSignalFromObservable(this._enabled$, undefined);
        this.enabled = enabled;
        this.disposables.push(enabledCleanup);
        const { signal: visible, cleanup: visibleCleanup } = createSignalFromObservable(this._visible$, undefined);
        this.visible = visible;
        this.disposables.push(visibleCleanup);
    }
}
//# sourceMappingURL=network-search.js.map