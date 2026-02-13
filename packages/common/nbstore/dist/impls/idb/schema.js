import {} from 'idb';
const migrate = (db, oldVersion, _newVersion, trx) => {
    if (!oldVersion) {
        oldVersion = 0;
    }
    for (let i = oldVersion; i < migrations.length; i++) {
        migrations[i](db, trx);
    }
};
// START REGION: migrations
const init = db => {
    const snapshots = db.createObjectStore('snapshots', {
        keyPath: 'docId',
        autoIncrement: false,
    });
    snapshots.createIndex('updatedAt', 'updatedAt', { unique: false });
    const updates = db.createObjectStore('updates', {
        keyPath: ['docId', 'createdAt'],
        autoIncrement: false,
    });
    updates.createIndex('docId', 'docId', { unique: false });
    const clocks = db.createObjectStore('clocks', {
        keyPath: 'docId',
        autoIncrement: false,
    });
    clocks.createIndex('timestamp', 'timestamp', { unique: false });
    const peerClocks = db.createObjectStore('peerClocks', {
        keyPath: ['peer', 'docId'],
        autoIncrement: false,
    });
    peerClocks.createIndex('peer', 'peer', { unique: false });
    db.createObjectStore('blobs', {
        keyPath: 'key',
        autoIncrement: false,
    });
    db.createObjectStore('blobData', {
        keyPath: 'key',
        autoIncrement: false,
    });
    db.createObjectStore('locks', {
        keyPath: 'key',
        autoIncrement: false,
    });
};
const initBlobSync = db => {
    const blobSync = db.createObjectStore('blobSync', {
        keyPath: ['peer', 'key'],
        autoIncrement: false,
    });
    blobSync.createIndex('peer', 'peer', { unique: false });
};
const initIndexer = db => {
    db.createObjectStore('indexerMetadata', {
        keyPath: 'key',
    });
    const indexRecordsStore = db.createObjectStore('indexerRecords', {
        autoIncrement: true,
    });
    indexRecordsStore.createIndex('table', 'table', {
        unique: false,
    });
    indexRecordsStore.createIndex('id', ['table', 'id'], {
        unique: true,
    });
    const invertedIndexStore = db.createObjectStore('invertedIndex', {
        autoIncrement: true,
    });
    invertedIndexStore.createIndex('key', ['table', 'key'], {
        unique: false,
    });
    invertedIndexStore.createIndex('nid', 'nid', { unique: false });
    db.createObjectStore('indexerSync', {
        keyPath: 'docId',
        autoIncrement: false,
    });
};
// END REGION
// 1. all schema changed should be put in migrations
// 2. order matters
const migrations = [init, initBlobSync, initIndexer];
export const migrator = {
    version: migrations.length,
    migrate,
};
//# sourceMappingURL=schema.js.map