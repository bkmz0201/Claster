import { Entity, LiveData } from '@toeverything/infra';
export class TemplateDocList extends Entity {
    constructor(listStore, docsService) {
        super();
        this.listStore = listStore;
        this.docsService = docsService;
    }
    isTemplate$(docId) {
        return LiveData.from(this.listStore.watchTemplateDoc(docId), false);
    }
    getTemplateDocs() {
        return this.listStore
            .getTemplateDocIds()
            .map(id => this.docsService.list.doc$(id).value)
            .filter((doc) => !!doc && !doc.trash$.value);
    }
}
//# sourceMappingURL=list.js.map