import { Entity, LiveData } from '@toeverything/infra';
import type { WorkbenchService } from '../../workbench';
export declare class Navigator extends Entity {
    private readonly workbenchService;
    constructor(workbenchService: WorkbenchService);
    private readonly history$;
    private readonly location$;
    readonly backable$: LiveData<boolean>;
    readonly forwardable$: LiveData<boolean>;
    back(): void;
    forward(): void;
}
//# sourceMappingURL=navigator.d.ts.map