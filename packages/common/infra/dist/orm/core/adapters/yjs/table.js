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
import { pick } from 'lodash-es';
import { Map as YMap, } from 'yjs';
import { shallowEqual } from '../../../../utils/shallow-equal';
import { validators } from '../../validators';
import { HookAdapter } from '../mixins';
/**
 * Yjs Adapter for AFFiNE ORM
 *
 * Structure:
 *
 * Each table is a YDoc instance
 *
 * Table(YDoc)
 *   Key(string): Row(YMap)({
 *     FieldA(string): Value(Primitive)
 *     FieldB(string): Value(Primitive)
 *     FieldC(string): Value(Primitive)
 *   })
 */
let YjsTableAdapter = (() => {
    let _classDecorators = [HookAdapter()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var YjsTableAdapter = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            YjsTableAdapter = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        constructor(tableName, doc) {
            this.tableName = tableName;
            this.doc = doc;
            this.deleteFlagKey = '$$DELETED';
            this.keyField = 'key';
            this.fields = [];
            this.origin = 'YjsTableAdapter';
        }
        setup(opts) {
            this.keyField = opts.keyField;
            this.fields = Object.keys(opts.schema);
        }
        dispose() {
            this.doc.destroy();
        }
        insert(query) {
            const { data, select } = query;
            validators.validateYjsEntityData(this.tableName, data);
            const key = data[this.keyField];
            const record = this.doc.getMap(key.toString());
            this.doc.transact(() => {
                for (const key in data) {
                    if (data[key] === undefined) {
                        // skip undefined fields, avoid unexpected override
                        continue;
                    }
                    record.set(key, data[key]);
                }
                record.delete(this.deleteFlagKey);
            }, this.origin);
            return this.value(record, select);
        }
        update(query) {
            const { data, select, where } = query;
            validators.validateYjsEntityData(this.tableName, data);
            const results = [];
            this.doc.transact(() => {
                for (const record of this.iterate(where)) {
                    results.push(this.value(record, select));
                    for (const key in data) {
                        this.setField(record, key, data[key]);
                    }
                }
            }, this.origin);
            return results;
        }
        find(query) {
            const { where, select } = query;
            const records = [];
            for (const record of this.iterate(where)) {
                records.push(this.value(record, select));
            }
            return records;
        }
        observe(query) {
            const { where, select, callback } = query;
            let listeningOnAll = false;
            const results = new Map();
            if (!where) {
                listeningOnAll = true;
            }
            for (const record of this.iterate(where)) {
                results.set(this.keyof(record), this.value(record, select));
            }
            callback(Array.from(results.values()));
            const ob = (tx) => {
                let hasChanged = false;
                for (const [ty] of tx.changed) {
                    const record = ty;
                    const key = this.keyof(record);
                    const isMatch = (listeningOnAll || (where && this.match(record, where))) &&
                        !this.isDeleted(record);
                    const prevMatch = results.get(key);
                    const isPrevMatched = results.has(key);
                    if (isMatch && isPrevMatched) {
                        const newValue = this.value(record, select);
                        if (!(prevMatch === newValue ||
                            (!select && // if select is set, we will check the value
                                select !== '*' &&
                                select !== 'key' &&
                                // skip if the value is the same
                                shallowEqual(prevMatch, newValue)))) {
                            results.set(key, newValue);
                            hasChanged = true;
                        }
                    }
                    else if (isMatch && !isPrevMatched) {
                        results.set(this.keyof(record), this.value(record, select));
                        hasChanged = true;
                    }
                    else if (!isMatch && isPrevMatched) {
                        results.delete(key);
                        hasChanged = true;
                    }
                }
                if (hasChanged) {
                    callback(Array.from(results.values()));
                }
            };
            this.doc.on('afterTransaction', ob);
            return () => {
                this.doc.off('afterTransaction', ob);
            };
        }
        delete(query) {
            const { where } = query;
            this.doc.transact(() => {
                for (const record of this.iterate(where)) {
                    this.deleteTy(record);
                }
            }, this.origin);
        }
        toObject(ty) {
            return YMap.prototype.toJSON.call(ty);
        }
        recordByKey(key) {
            // detect if the record is there otherwise yjs will create an empty Map.
            if (this.doc.share.has(key)) {
                return this.doc.getMap(key);
            }
            return null;
        }
        *iterate(where) {
            if (!where) {
                for (const map of this.doc.share.values()) {
                    if (!this.isDeleted(map)) {
                        yield map;
                    }
                }
            }
            // fast pass for key lookup without iterating the whole table
            else if ('byKey' in where) {
                const record = this.recordByKey(where.byKey.toString());
                if (record) {
                    yield record;
                }
            }
            else if (Array.isArray(where)) {
                for (const map of this.doc.share.values()) {
                    if (this.match(map, where)) {
                        yield map;
                    }
                }
            }
        }
        value(record, select = '*') {
            if (this.isDeleted(record) || this.isEmpty(record)) {
                return null;
            }
            let selectedFields;
            if (select === 'key') {
                return this.keyof(record);
            }
            else if (select === '*') {
                return this.toObject(record);
            }
            else {
                selectedFields = select;
            }
            return pick(this.toObject(record), selectedFields);
        }
        match(record, where) {
            return (!this.isDeleted(record) &&
                (Array.isArray(where)
                    ? where.length === 0
                        ? false
                        : where.every(c => {
                            const field = this.field(record, c.field);
                            const condition = c.value;
                            if (typeof condition === 'object') {
                                if (condition === null) {
                                    return field === null;
                                }
                                if ('not' in condition) {
                                    return field !== condition.not;
                                }
                            }
                            return field === condition;
                        })
                    : where.byKey === this.keyof(record)));
        }
        isDeleted(record) {
            return (this.field(record, this.deleteFlagKey) === true || this.isEmpty(record));
        }
        keyof(record) {
            return this.field(record, this.keyField);
        }
        field(ty, field) {
            const val = YMap.prototype.get.call(ty, field);
            // only handle null will make the day easier
            if (val === undefined) {
                return null;
            }
            return val;
        }
        setField(ty, field, value) {
            YMap.prototype.set.call(ty, field, value);
        }
        isEmpty(ty) {
            return ty._map.size === 0;
        }
        deleteTy(ty) {
            this.fields.forEach(field => {
                if (field !== this.keyField) {
                    YMap.prototype.delete.call(ty, field);
                }
            });
            YMap.prototype.set.call(ty, this.deleteFlagKey, true);
        }
    };
    return YjsTableAdapter = _classThis;
})();
export { YjsTableAdapter };
//# sourceMappingURL=table.js.map