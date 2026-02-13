import { Component } from './component';
export class Service extends Component {
    constructor() {
        super(...arguments);
        this.__isService = true;
        this.__injectable = true;
    }
}
//# sourceMappingURL=service.js.map