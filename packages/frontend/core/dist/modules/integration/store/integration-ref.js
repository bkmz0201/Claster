import { Store } from '@toeverything/infra';
export class IntegrationRefStore extends Store {
    constructor(dbService, docsService) {
        super();
        this.dbService = dbService;
        this.docsService = docsService;
    }
    get userDB() {
        return this.dbService.userdataDB$.value.db;
    }
    get allDocsMap() {
        return this.docsService.list.docsMap$.value;
    }
    getRefs(where) {
        const refs = this.userDB.docIntegrationRef.find({
            ...where,
        });
        return refs.filter(ref => {
            const docExists = this.allDocsMap.has(ref.id);
            if (!docExists)
                this.deleteRef(ref.id);
            return docExists;
        });
    }
    createRef(docId, config) {
        return this.userDB.docIntegrationRef.create({
            id: docId,
            ...config,
        });
    }
    updateRef(docId, config) {
        return this.userDB.docIntegrationRef.update(docId, config);
    }
    deleteRef(docId) {
        return this.userDB.docIntegrationRef.delete(docId);
    }
}
//# sourceMappingURL=integration-ref.js.map