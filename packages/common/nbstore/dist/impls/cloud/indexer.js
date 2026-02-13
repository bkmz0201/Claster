import { indexerAggregateQuery, indexerSearchQuery, } from '@affine/graphql';
import { Observable } from 'rxjs';
import { IndexerStorageBase, } from '../../storage/indexer';
import { HttpConnection } from './http';
export class CloudIndexerStorage extends IndexerStorageBase {
    static { this.identifier = 'CloudIndexerStorage'; }
    constructor(options) {
        super();
        this.options = options;
        this.isReadonly = true;
        this.connection = new HttpConnection(this.options.serverBaseUrl);
    }
    async search(table, query, options) {
        const res = await this.connection.gql({
            query: indexerSearchQuery,
            variables: {
                id: this.options.id,
                input: {
                    table,
                    query,
                    options,
                },
            },
        });
        const result = res.workspace.search;
        return result;
    }
    search$(table, query, options) {
        return new Observable(observer => {
            this.search(table, query, options)
                .then(data => {
                observer.next(data);
                observer.complete();
            })
                .catch(error => {
                observer.error(error);
            });
        });
    }
    async aggregate(table, query, field, options) {
        const res = await this.connection.gql({
            query: indexerAggregateQuery,
            variables: {
                id: this.options.id,
                input: { table, query, field, options },
            },
        });
        const result = res.workspace.aggregate;
        return result;
    }
    aggregate$(table, query, field, options) {
        return new Observable(observer => {
            this.aggregate(table, query, field, options)
                .then(data => {
                observer.next(data);
                observer.complete();
            })
                .catch(error => {
                observer.error(error);
            });
        });
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