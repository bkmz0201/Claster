import { createSignalFromObservable, } from '@blocksuite/affine/shared/utils';
import { Service } from '@toeverything/infra';
export class AIPlaygroundService extends Service {
    constructor(featureFlagService) {
        super();
        this.featureFlagService = featureFlagService;
        this._visible$ = this.featureFlagService.flags.enable_ai_playground.$;
        const { signal: visible, cleanup: visibleCleanup } = createSignalFromObservable(this._visible$, undefined);
        this.visible = visible;
        this.disposables.push(visibleCleanup);
    }
}
//# sourceMappingURL=playground.js.map