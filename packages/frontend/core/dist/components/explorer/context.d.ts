import { LiveData } from '@toeverything/infra';
import type { ExplorerDisplayPreference } from './types';
export type DocExplorerContextType = {
    groups$: LiveData<Array<{
        key: string;
        items: string[];
    }>>;
    collapsedGroups$: LiveData<string[]>;
    selectMode$?: LiveData<boolean>;
    selectedDocIds$: LiveData<string[]>;
    prevCheckAnchorId$?: LiveData<string | null>;
    displayPreference$: LiveData<ExplorerDisplayPreference>;
} & {
    [K in keyof ExplorerDisplayPreference as `${K}$`]: LiveData<ExplorerDisplayPreference[K]>;
};
export declare const DocExplorerContext: import("react").Context<DocExplorerContextType>;
export declare const createDocExplorerContext: (initialState?: ExplorerDisplayPreference) => {
    groups$: LiveData<{
        key: string;
        items: string[];
    }[]>;
    collapsedGroups$: LiveData<string[]>;
    selectMode$: LiveData<boolean>;
    selectedDocIds$: LiveData<string[]>;
    prevCheckAnchorId$: LiveData<string | null>;
    displayPreference$: LiveData<ExplorerDisplayPreference>;
    showDragHandle$: LiveData<boolean | undefined>;
    view$: LiveData<import("./docs-view/doc-list-item").DocListItemView | undefined>;
    groupBy$: LiveData<import("../../modules/collection-rules/types").GroupByParams | undefined>;
    orderBy$: LiveData<import("../../modules/collection-rules/types").OrderByParams | undefined>;
    displayProperties$: LiveData<string[] | undefined>;
    showDocIcon$: LiveData<boolean | undefined>;
    showDocPreview$: LiveData<boolean | undefined>;
    quickFavorite$: LiveData<boolean | undefined>;
    quickSelect$: LiveData<boolean | undefined>;
    quickSplit$: LiveData<boolean | undefined>;
    quickTrash$: LiveData<boolean | undefined>;
    quickTab$: LiveData<boolean | undefined>;
    showMoreOperation$: LiveData<boolean | undefined>;
    quickDeletePermanently$: LiveData<boolean | undefined>;
    quickRestore$: LiveData<boolean | undefined>;
};
//# sourceMappingURL=context.d.ts.map