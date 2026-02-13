import { type Signal } from '@blocksuite/affine/shared/utils';
import { Service } from '@toeverything/infra';
import type { FeatureFlagService } from '../../feature-flag';
export declare class AIPlaygroundService extends Service {
    private readonly featureFlagService;
    constructor(featureFlagService: FeatureFlagService);
    visible: Signal<boolean | undefined>;
    private readonly _visible$;
}
//# sourceMappingURL=playground.d.ts.map