import type { DocMode } from '@blocksuite/affine/model';
import { Entity, LiveData } from '@toeverything/infra';
import type { QuickSearchSession } from '../providers/quick-search-provider';
import type { QuickSearchItem } from '../types/item';
export declare class CreationQuickSearchSession extends Entity implements QuickSearchSession<'creation', {
    title: string;
    mode: DocMode;
}> {
    query$: LiveData<string>;
    items$: LiveData<QuickSearchItem<"creation", {
        title: string;
        mode: DocMode;
    }>[]>;
    query(query: string): void;
}
//# sourceMappingURL=creation.d.ts.map