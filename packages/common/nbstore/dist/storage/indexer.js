export * from './indexer/document';
export * from './indexer/field-type';
export * from './indexer/query';
export * from './indexer/schema';
export class IndexerStorageBase {
    constructor() {
        this.storageType = 'indexer';
        this.recommendRefreshInterval = 100; // 100ms
    }
}
//# sourceMappingURL=indexer.js.map