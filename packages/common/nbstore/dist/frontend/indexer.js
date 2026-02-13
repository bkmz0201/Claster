export class IndexerFrontend {
    constructor(sync) {
        this.sync = sync;
    }
    get state$() {
        return this.sync.state$;
    }
    docState$(docId) {
        return this.sync.docState$(docId);
    }
    async search(table, query, options) {
        return this.sync.search(table, query, options);
    }
    async aggregate(table, query, field, options) {
        return this.sync.aggregate(table, query, field, options);
    }
    search$(table, query, options) {
        return this.sync.search$(table, query, options);
    }
    aggregate$(table, query, field, options) {
        return this.sync.aggregate$(table, query, field, options);
    }
    addPriority(docId, priority) {
        return this.sync.addPriority(docId, priority);
    }
    waitForCompleted(signal) {
        return this.sync.waitForCompleted(signal);
    }
    waitForDocCompleted(docId, signal) {
        return this.sync.waitForDocCompleted(docId, signal);
    }
    waitForDocCompletedWithPriority(docId, priority, signal) {
        const undo = this.addPriority(docId, priority);
        return this.sync.waitForDocCompleted(docId, signal).finally(() => undo());
    }
}
//# sourceMappingURL=indexer.js.map