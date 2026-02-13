import { type Signal } from '@blocksuite/affine/shared/utils';
import { Service } from '@toeverything/infra';
import type { FeatureFlagService } from '../../feature-flag';
import type { GlobalStateService } from '../../storage';
export declare class AINetworkSearchService extends Service {
    private readonly globalStateService;
    private readonly featureFlagService;
    constructor(globalStateService: GlobalStateService, featureFlagService: FeatureFlagService);
    visible: Signal<boolean | undefined>;
    enabled: Signal<boolean | undefined>;
    private readonly _visible$;
    private readonly _enabled$;
    setEnabled: (enabled: boolean) => void;
}
//# sourceMappingURL=network-search.d.ts.map