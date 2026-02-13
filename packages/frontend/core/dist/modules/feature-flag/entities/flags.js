import { Entity, LiveData } from '@toeverything/infra';
import { NEVER } from 'rxjs';
import { AFFINE_FLAGS } from '../constant';
const FLAG_PREFIX = 'affine-flag:';
export class Flags extends Entity {
    constructor(globalStateService) {
        super();
        this.globalStateService = globalStateService;
        this.globalState = this.globalStateService.globalState;
        Object.entries(AFFINE_FLAGS).forEach(([flagKey, flag]) => {
            const configurable = flag.configurable ?? true;
            const defaultState = 'defaultState' in flag ? flag.defaultState : undefined;
            const getValue = () => {
                return configurable
                    ? (this.globalState.get(FLAG_PREFIX + flagKey) ??
                        defaultState)
                    : defaultState;
            };
            const item = {
                ...flag,
                get value() {
                    return getValue();
                },
                set: (value) => {
                    if (!configurable) {
                        return;
                    }
                    this.globalState.set(FLAG_PREFIX + flagKey, value);
                },
                $: configurable
                    ? LiveData.from(this.globalState.watch(FLAG_PREFIX + flagKey), undefined).map(value => value ?? defaultState)
                    : LiveData.from(NEVER, defaultState),
            };
            Object.defineProperty(this, flagKey, {
                get: () => {
                    return item;
                },
            });
        });
    }
}
//# sourceMappingURL=flags.js.map