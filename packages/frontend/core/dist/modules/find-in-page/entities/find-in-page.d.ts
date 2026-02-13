import { Entity, LiveData } from '@toeverything/infra';
import type { DesktopApiService } from '../../desktop-api';
export declare class FindInPage extends Entity {
    private readonly electronApi;
    readonly searchText$: LiveData<string | null>;
    readonly isSearching$: LiveData<boolean>;
    private readonly direction$;
    readonly visible$: LiveData<boolean>;
    readonly result$: LiveData<Electron.Result | null>;
    constructor(electronApi: DesktopApiService);
    findInPage(searchText?: string): void;
    onChangeVisible(visible: boolean): void;
    toggleVisible(text?: string): void;
    backward(): void;
    forward(): void;
    clear(): void;
}
//# sourceMappingURL=find-in-page.d.ts.map