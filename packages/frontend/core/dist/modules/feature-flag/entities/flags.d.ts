import { Entity, LiveData } from '@toeverything/infra';
import type { GlobalStateService } from '../../storage';
import { AFFINE_FLAGS } from '../constant';
import type { FlagInfo } from '../types';
export type Flag<F extends FlagInfo = FlagInfo> = {
    readonly value: F['defaultState'] extends boolean ? boolean : boolean | undefined;
    set: (value: boolean) => void;
    $: F['defaultState'] extends boolean ? LiveData<boolean> : LiveData<boolean> | LiveData<boolean | undefined>;
} & F;
export declare class Flags extends Entity {
    private readonly globalStateService;
    private readonly globalState;
    constructor(globalStateService: GlobalStateService);
}
export type FlagsExt = Flags & {
    [K in keyof AFFINE_FLAGS]: Flag<AFFINE_FLAGS[K]>;
};
//# sourceMappingURL=flags.d.ts.map