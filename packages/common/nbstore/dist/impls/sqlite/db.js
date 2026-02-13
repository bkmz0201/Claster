import { AutoReconnectConnection } from '../../connection';
import { universalId } from '../../utils/universal-id';
let apis = null;
export function bindNativeDBApis(a) {
    apis = a;
}
export class NativeDBConnection extends AutoReconnectConnection {
    constructor(options) {
        super();
        this.options = options;
        this.flavour = this.options.flavour;
        this.type = this.options.type;
        this.id = this.options.id;
        if (!apis) {
            throw new Error('Not in native context.');
        }
        this.apis = this.warpApis(apis);
    }
    get shareId() {
        return `sqlite:${this.flavour}:${this.type}:${this.id}`;
    }
    warpApis(originalApis) {
        const id = universalId({
            peer: this.flavour,
            type: this.type,
            id: this.id,
        });
        return new Proxy({}, {
            get: (_target, key) => {
                const v = originalApis[key];
                return async (...args) => {
                    return v.call(originalApis, id, 
                    // @ts-expect-error I don't know why it complains ts(2556)
                    ...args);
                };
            },
        });
    }
    async doConnect() {
        await this.apis.connect();
    }
    doDisconnect() {
        this.apis.disconnect().catch(err => {
            console.error('NativeDBConnection close failed', err);
        });
    }
}
//# sourceMappingURL=db.js.map