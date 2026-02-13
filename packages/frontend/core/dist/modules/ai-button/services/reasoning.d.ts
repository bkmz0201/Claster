import { type Signal } from '@blocksuite/affine/shared/utils';
import { Service } from '@toeverything/infra';
import type { GlobalStateService } from '../../storage';
export declare class AIReasoningService extends Service {
    private readonly globalStateService;
    constructor(globalStateService: GlobalStateService);
    enabled: Signal<boolean | undefined>;
    private readonly _enabled$;
    setEnabled: (enabled: boolean) => void;
}
//# sourceMappingURL=reasoning.d.ts.map