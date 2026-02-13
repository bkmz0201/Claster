import { CONSTRUCTOR_CONTEXT } from '../constructor-context';
export class Component {
    get eventBus() {
        return this.framework.eventBus;
    }
    constructor() {
        this.disposables = [];
        if (!CONSTRUCTOR_CONTEXT.current.provider) {
            throw new Error('Component must be created in the context of a provider');
        }
        this.framework = CONSTRUCTOR_CONTEXT.current.provider;
        this.props = CONSTRUCTOR_CONTEXT.current.props;
        CONSTRUCTOR_CONTEXT.current = {};
    }
    dispose() {
        this.disposables.forEach(dispose => dispose());
    }
    [Symbol.dispose]() {
        this.dispose();
    }
}
//# sourceMappingURL=component.js.map