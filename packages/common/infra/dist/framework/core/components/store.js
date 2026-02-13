import { Component } from './component';
export class Store extends Component {
    constructor() {
        super(...arguments);
        this.__isStore = true;
        this.__injectable = true;
    }
}
//# sourceMappingURL=store.js.map