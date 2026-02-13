import { Entity, LiveData } from '@toeverything/infra';
import type { DocsService } from '../../doc';
import type { TagStore } from '../stores/tag';
export declare class Tag extends Entity<{
    id: string;
}> {
    private readonly store;
    private readonly docs;
    id: string;
    constructor(store: TagStore, docs: DocsService);
    private readonly tagOption$;
    value$: LiveData<string>;
    color$: LiveData<string>;
    createDate$: LiveData<number | Date>;
    updateDate$: LiveData<number | Date>;
    rename(value: string): void;
    changeColor(color: string): void;
    tag(pageId: string): void;
    untag(pageId: string): void;
    readonly pageIds$: LiveData<string[]>;
}
//# sourceMappingURL=tag.d.ts.map