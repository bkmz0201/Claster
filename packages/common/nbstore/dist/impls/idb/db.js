import { openDB } from 'idb';
import { AutoReconnectConnection } from '../../connection';
import { migrator } from './schema';
export class IDBConnection extends AutoReconnectConnection {
    get shareId() {
        return `idb(${migrator.version}):${this.dbName}`;
    }
    constructor(opts) {
        super();
        this.opts = opts;
        this.dbName = `${this.opts.flavour}:${this.opts.type}:${this.opts.id}`;
        this.handleVersionChange = (e) => {
            if (e.newVersion !== migrator.version) {
                this.error = new Error('Database version mismatch, expected ' +
                    migrator.version +
                    ' but got ' +
                    e.newVersion);
            }
        };
    }
    async doConnect() {
        // indexeddb will responsible for version control, so the db.version always match migrator.version
        const db = await openDB(this.dbName, migrator.version, {
            upgrade: migrator.migrate,
        });
        db.addEventListener('versionchange', this.handleVersionChange);
        return {
            db,
            channel: new BroadcastChannel('idb:' + this.dbName),
        };
    }
    doDisconnect(db) {
        db.db.removeEventListener('versionchange', this.handleVersionChange);
        db.channel.close();
        db.db.close();
    }
}
//# sourceMappingURL=db.js.map