import { openDB } from 'idb';
import { AutoReconnectConnection } from '../../../connection';
export class DocIDBConnection extends AutoReconnectConnection {
    get shareId() {
        return 'idb(old):affine-local';
    }
    async doConnect() {
        const dbs = await indexedDB.databases();
        if (dbs.some(d => d.name === 'affine-local')) {
            return openDB('affine-local', 1, {
                upgrade: db => {
                    db.createObjectStore('workspace', { keyPath: 'id' });
                },
            });
        }
        else {
            return null;
        }
    }
    doDisconnect(conn) {
        conn?.close();
    }
}
export class BlobIDBConnection extends AutoReconnectConnection {
    constructor(options) {
        super();
        this.options = options;
    }
    get shareId() {
        return `idb(old-blob):${this.options.id}`;
    }
    async doConnect() {
        const dbs = await indexedDB.databases();
        if (dbs.some(d => d.name === `${this.options.id}_blob`)) {
            return openDB(`${this.options.id}_blob`, 1, {
                upgrade: db => {
                    db.createObjectStore('blob');
                },
            });
        }
        else {
            return null;
        }
    }
    doDisconnect(conn) {
        conn?.close();
    }
}
//# sourceMappingURL=db.js.map