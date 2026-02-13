import { NEVER } from 'rxjs';
import { DummyConnection } from '../../connection';
import { IndexerStorageBase, } from '../indexer';
export class DummyIndexerStorage extends IndexerStorageBase {
    constructor() {
        super(...arguments);
        this.isReadonly = true;
        this.connection = new DummyConnection();
    }
    search(_table, _query, _options) {
        return Promise.resolve({
            pagination: { count: 0, limit: 0, skip: 0, hasMore: false },
            nodes: [],
        });
    }
    aggregate(_table, _query, _field, _options) {
        return Promise.resolve({
            pagination: { count: 0, limit: 0, skip: 0, hasMore: false },
            buckets: [],
        });
    }
    search$(_table, _query, _options) {
        return NEVER;
    }
    aggregate$(_table, _query, _field, _options) {
        return NEVER;
    }
    deleteByQuery(_table, _query) {
        return Promise.resolve();
    }
    insert(_table, _document) {
        return Promise.resolve();
    }
    delete(_table, _id) {
        return Promise.resolve();
    }
    update(_table, _document) {
        return Promise.resolve();
    }
    refresh(_table) {
        return Promise.resolve();
    }
    async refreshIfNeed() {
        return Promise.resolve();
    }
}
//# sourceMappingURL=indexer.js.map