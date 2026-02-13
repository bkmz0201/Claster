import { DummyConnection } from '../../connection';
import { BlobStorageBase, } from '../blob';
export class DummyBlobStorage extends BlobStorageBase {
    constructor() {
        super(...arguments);
        this.isReadonly = true;
        this.connection = new DummyConnection();
    }
    get(_key, _signal) {
        return Promise.resolve(null);
    }
    set(_blob, _signal) {
        return Promise.resolve();
    }
    delete(_key, _permanently, _signal) {
        return Promise.resolve();
    }
    release(_signal) {
        return Promise.resolve();
    }
    list(_signal) {
        return Promise.resolve([]);
    }
}
//# sourceMappingURL=blob.js.map