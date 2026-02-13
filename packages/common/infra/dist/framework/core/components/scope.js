import { Component } from './component';
export class Scope extends Component {
    constructor() {
        super(...arguments);
        this.__injectable = true;
    }
    get collection() {
        return this.framework.collection;
    }
    get scope() {
        return this.framework.scope;
    }
    get get() {
        return this.framework.get;
    }
    get getAll() {
        return this.framework.getAll;
    }
    get getOptional() {
        return this.framework.getOptional;
    }
    get createEntity() {
        return this.framework.createEntity;
    }
    get createScope() {
        return this.framework.createScope;
    }
    get emitEvent() {
        return this.framework.emitEvent;
    }
    dispose() {
        super.dispose();
        this.framework.dispose();
    }
}
//# sourceMappingURL=scope.js.map