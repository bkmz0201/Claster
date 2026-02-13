import { ColorScheme } from '@blocksuite/affine/model';
import type { Signal } from '@preact/signals-core';
import { Entity, LiveData } from '@toeverything/infra';
export declare class AppTheme extends Entity {
    theme$: LiveData<string | undefined>;
    themeSignal: Signal<ColorScheme>;
    constructor();
}
//# sourceMappingURL=theme.d.ts.map