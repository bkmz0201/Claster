export function HookAdapter() {
    // @ts-expect-error allow
    return (Class) => {
        return class TableAdapterExtensions extends Class {
            constructor() {
                super(...arguments);
                this.hooks = [];
            }
            setup(opts) {
                super.setup(opts);
                this.hooks = opts.hooks ?? [];
            }
            deserialize(data) {
                if (!this.hooks.length) {
                    return data;
                }
                return this.hooks.reduce((acc, hook) => hook.deserialize(acc), Object.assign({}, data));
            }
            toObject(data) {
                return this.deserialize(super.toObject(data));
            }
        };
    };
}
//# sourceMappingURL=hook.js.map