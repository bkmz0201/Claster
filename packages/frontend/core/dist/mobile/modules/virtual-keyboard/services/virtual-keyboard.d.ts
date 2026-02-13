import { LiveData, Service } from '@toeverything/infra';
import type { VirtualKeyboardProvider } from '../providers/virtual-keyboard';
export declare class VirtualKeyboardService extends Service {
    private readonly virtualKeyboardProvider;
    readonly visible$: LiveData<boolean>;
    readonly height$: LiveData<number>;
    staticHeight: number;
    constructor(virtualKeyboardProvider: VirtualKeyboardProvider);
    private _observe;
}
//# sourceMappingURL=virtual-keyboard.d.ts.map