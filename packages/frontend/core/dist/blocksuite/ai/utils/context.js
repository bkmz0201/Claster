export class AIContext {
    constructor(initData = {}) {
        this.get = () => {
            return this._value;
        };
        this.set = (data) => {
            this._value = {
                ...this._value,
                ...data,
            };
        };
        this._value = initData;
    }
}
//# sourceMappingURL=context.js.map