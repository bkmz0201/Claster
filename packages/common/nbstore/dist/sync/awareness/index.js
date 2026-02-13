export class AwarenessSyncImpl {
    constructor(storages) {
        this.storages = storages;
    }
    async update(record, origin) {
        await Promise.all([this.storages.local, ...Object.values(this.storages.remotes)].map(peer => peer.connection.status === 'connected'
            ? peer.update(record, origin)
            : Promise.resolve()));
    }
    subscribeUpdate(id, onUpdate, onCollect) {
        const unsubscribes = [
            this.storages.local,
            ...Object.values(this.storages.remotes),
        ].map(peer => peer.subscribeUpdate(id, onUpdate, onCollect));
        return () => {
            unsubscribes.forEach(unsubscribe => unsubscribe());
        };
    }
}
//# sourceMappingURL=index.js.map