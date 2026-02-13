import { LiveData, Service } from '@toeverything/infra';
import type { GlobalState } from '../../storage';
import type { CustomTheme } from '../types';
export declare class ThemeEditorService extends Service {
    readonly globalState: GlobalState;
    constructor(globalState: GlobalState);
    private readonly _key;
    customTheme$: LiveData<CustomTheme | undefined>;
    modified$: LiveData<boolean | undefined>;
    reset(): void;
    setCustomTheme(theme: CustomTheme): void;
    updateCustomTheme(mode: 'light' | 'dark', key: string, value?: string): void;
}
//# sourceMappingURL=theme-editor.d.ts.map