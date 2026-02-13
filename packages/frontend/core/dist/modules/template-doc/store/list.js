import { Store } from '@toeverything/infra';
import { map } from 'rxjs';
export class TemplateDocListStore extends Store {
    constructor(dbService) {
        super();
        this.dbService = dbService;
    }
    isTemplateDoc(docId) {
        return !!this.dbService.db.docProperties.find({
            id: docId,
            isTemplate: true,
        })[0]?.isTemplate;
    }
    watchTemplateDoc(docId) {
        return this.dbService.db.docProperties
            .find$({ id: docId, isTemplate: true })
            .pipe(map(res => res[0]?.isTemplate));
    }
    getTemplateDocIds() {
        return this.dbService.db.docProperties
            .find({ isTemplate: true })
            .map(property => property.id);
    }
    watchTemplateDocs() {
        return this.dbService.db.docProperties.find$({ isTemplate: true });
    }
}
//# sourceMappingURL=list.js.map