import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { GlobalState } from '../../storage';
import type { EditorSettingProvider } from '../provider/editor-setting-provider';
/**
 * just for testing, vary poor performance
 */
export declare class GlobalStateEditorSettingProvider extends Service implements EditorSettingProvider {
    readonly globalState: GlobalState;
    constructor(globalState: GlobalState);
    set(key: string, value: string): void;
    get(key: string): string | undefined;
    watchAll(): Observable<Record<string, string>>;
}
//# sourceMappingURL=global-state.d.ts.map