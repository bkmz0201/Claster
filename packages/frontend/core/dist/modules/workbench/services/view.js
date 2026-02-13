import { Service } from '@toeverything/infra';
export class ViewService extends Service {
    constructor(scope) {
        super();
        this.scope = scope;
        this.view = this.scope.props.view;
    }
}
//# sourceMappingURL=view.js.map