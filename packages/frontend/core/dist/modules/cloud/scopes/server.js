import { Scope } from '@toeverything/infra';
export class ServerScope extends Scope {
    constructor() {
        super(...arguments);
        this.server = this.props.server;
    }
}
//# sourceMappingURL=server.js.map