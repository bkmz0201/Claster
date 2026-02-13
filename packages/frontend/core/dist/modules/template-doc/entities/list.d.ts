import { Entity, LiveData } from '@toeverything/infra';
import type { DocRecord, DocsService } from '../../doc';
import type { TemplateDocListStore } from '../store/list';
export declare class TemplateDocList extends Entity {
    listStore: TemplateDocListStore;
    docsService: DocsService;
    constructor(listStore: TemplateDocListStore, docsService: DocsService);
    isTemplate$(docId: string): LiveData<boolean | null | undefined>;
    getTemplateDocs(): DocRecord[];
}
//# sourceMappingURL=list.d.ts.map