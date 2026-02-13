import { Service } from '@toeverything/infra';
export class NbstoreService extends Service {
    constructor(nbstoreProvider) {
        super();
        this.nbstoreProvider = nbstoreProvider;
    }
    openStore(key, options) {
        return this.nbstoreProvider.openStore(key, options);
    }
}
//# sourceMappingURL=nbstore.js.map