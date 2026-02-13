import { Entity, LiveData } from '@toeverything/infra';
import type { QuickSearchSourceItemType } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
import type { QuickSearchOptions } from '../types/options';
export declare class QuickSearch extends Entity {
    constructor();
    private readonly state$;
    readonly items$: LiveData<{
        id: string;
        source: any;
        label: import("@affine/i18n").I18nString | {
            title: import("@affine/i18n").I18nString;
            subTitle?: import("@affine/i18n").I18nString;
        };
        score?: number;
        icon?: React.ReactNode | React.ComponentType;
        group?: import("../types/group").QuickSearchGroup;
        disabled?: boolean;
        keyBinding?: string;
        timestamp?: number;
        payload?: any;
        beforeSubmit?: () => boolean;
    }[]>;
    readonly error$: LiveData<any>;
    readonly show$: LiveData<boolean>;
    readonly options$: LiveData<QuickSearchOptions | undefined>;
    readonly isLoading$: LiveData<boolean>;
    readonly loadingProgress$: LiveData<number>;
    show: <const Sources extends any[]>(sources: Sources, cb: (result: QuickSearchSourceItemType<Sources[number]> | null) => void, options?: QuickSearchOptions) => void;
    query$: LiveData<string>;
    setQuery: (query: string) => void;
    hide(): void;
    submit(result: QuickSearchItem | null): void;
}
//# sourceMappingURL=quick-search.d.ts.map