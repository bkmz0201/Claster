import { Service } from '@toeverything/infra';
import { type Observable } from 'rxjs';
import type { ServersService } from '../../cloud';
import type { GlobalState } from '../../storage';
import type { EditorSettingProvider } from '../provider/editor-setting-provider';
export declare class CurrentUserDBEditorSettingProvider extends Service implements EditorSettingProvider {
    readonly serversService: ServersService;
    readonly globalState: GlobalState;
    private readonly currentUserDB$;
    fallback: GlobalStateEditorSettingProvider;
    constructor(serversService: ServersService, globalState: GlobalState);
    set(key: string, value: string): void;
    get(key: string): string | undefined;
    watchAll(): Observable<Record<string, string>>;
}
declare class GlobalStateEditorSettingProvider implements EditorSettingProvider {
    readonly globalState: GlobalState;
    constructor(globalState: GlobalState);
    set(key: string, value: string): void;
    get(key: string): string | undefined;
    watchAll(): Observable<Record<string, string>>;
}
export {};
//# sourceMappingURL=user-db.d.ts.map