import { DummyConnection } from '../../connection';
import { AwarenessStorageBase } from '../awareness';
export class DummyAwarenessStorage extends AwarenessStorageBase {
    constructor() {
        super(...arguments);
        this.connection = new DummyConnection();
    }
    update(_record, _origin) {
        return Promise.resolve();
    }
    subscribeUpdate(_id, _onUpdate, _onCollect) {
        return () => { };
    }
}
//# sourceMappingURL=awareness.js.map