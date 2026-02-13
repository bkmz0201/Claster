var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { merge, pick } from 'lodash-es';
import { HookAdapter } from '../mixins';
let MemoryTableAdapter = (() => {
    let _classDecorators = [HookAdapter()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MemoryTableAdapter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MemoryTableAdapter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(tableName) {
            this.tableName = tableName;
            this.data = new Map();
            this.keyField = 'key';
            this.subscriptions = new Set();
        }
        setup(opts) {
            this.keyField = opts.keyField;
        }
        dispose() { }
        insert(query) {
            const { data, select } = query;
            const key = String(data[this.keyField]);
            if (this.data.has(key)) {
                throw new Error(`Record with key ${key} already exists in table ${this.tableName}`);
            }
            this.data.set(key, data);
            this.dispatch(key, data);
            return this.value(data, select);
        }
        find(query) {
            const { where, select } = query;
            const result = [];
            for (const record of this.iterate(where)) {
                result.push(this.value(record, select));
            }
            return result;
        }
        observe(query) {
            const { where, select, callback } = query;
            let listeningOnAll = false;
            const obKeys = new Set();
            const results = [];
            if (!where) {
                listeningOnAll = true;
            }
            else if ('byKey' in where) {
                obKeys.add(where.byKey.toString());
            }
            for (const record of this.iterate(where)) {
                const key = String(record[this.keyField]);
                if (!listeningOnAll) {
                    obKeys.add(key);
                }
                results.push(this.value(record, select));
            }
            callback(results);
            const ob = (key, data) => {
                if (listeningOnAll ||
                    obKeys.has(key) ||
                    (where && this.match(data, where))) {
                    callback(this.find({ where, select }));
                    return;
                }
            };
            this.subscriptions.add(ob);
            return () => {
                this.subscriptions.delete(ob);
            };
        }
        update(query) {
            const { where, data, select } = query;
            const result = [];
            for (let record of this.iterate(where)) {
                record = merge({}, record, data);
                const key = String(record[this.keyField]);
                this.data.set(key, record);
                this.dispatch(key, record);
                result.push(this.value(this.value(record, select)));
            }
            return result;
        }
        delete(query) {
            const { where } = query;
            for (const record of this.iterate(where)) {
                const key = String(record[this.keyField]);
                this.data.delete(key);
                this.dispatch(key, null);
            }
        }
        toObject(record) {
            return record;
        }
        value(data, select = '*') {
            if (select === 'key') {
                return data[this.keyField];
            }
            if (select === '*') {
                return this.toObject(data);
            }
            return pick(this.toObject(data), select);
        }
        *iterate(where = []) {
            if (Array.isArray(where)) {
                for (const value of this.data.values()) {
                    if (this.match(value, where)) {
                        yield value;
                    }
                }
            }
            else {
                const key = where.byKey;
                const record = this.data.get(key.toString());
                if (record) {
                    yield record;
                }
            }
        }
        match(record, where) {
            if (Array.isArray(where)) {
                return where.every(c => {
                    const value = record[c.field] || null;
                    const condition = c.value;
                    if (typeof condition === 'object') {
                        if (condition === null) {
                            return value === null;
                        }
                        if ('not' in condition) {
                            return value !== condition.not;
                        }
                    }
                    return value === condition;
                });
            }
            return where.byKey === record[this.keyField];
        }
        dispatch(key, data) {
            this.subscriptions.forEach(callback => callback(key, data));
        }
    };
    return MemoryTableAdapter = _classThis;
})();
export { MemoryTableAdapter };
//# sourceMappingURL=table.js.map