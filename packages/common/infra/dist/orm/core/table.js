import { isUndefined, omitBy } from 'lodash-es';
import { Observable, shareReplay } from 'rxjs';
import { validators } from './validators';
export class Table {
    constructor(db, name, opts) {
        this.name = name;
        this.opts = opts;
        this.schema = {};
        this.keyField = '';
        this.isDocumentTable = false;
        this.subscribedKeys = new Map();
        this.adapter = db.table(name);
        for (const [fieldName, fieldBuilder] of Object.entries(this.opts.schema)) {
            // handle internal fields
            if (fieldName.startsWith('__')) {
                if (fieldName === '__document') {
                    this.isDocumentTable = true;
                }
                continue;
            }
            this.schema[fieldName] = fieldBuilder.schema;
            if (fieldBuilder.schema.isPrimaryKey) {
                this.keyField = fieldName;
            }
        }
        this.adapter.setup({ ...opts, keyField: this.keyField });
    }
    create(input) {
        const data = Object.entries(this.schema).reduce((acc, [key, schema]) => {
            const inputVal = acc[key];
            if (inputVal === undefined) {
                if (schema.optional) {
                    acc[key] = undefined;
                }
                if (schema.default) {
                    acc[key] = schema.default() ?? undefined;
                }
            }
            return acc;
        }, omitBy(input, isUndefined));
        validators.validateCreateEntityData(this, data);
        return this.adapter.insert({
            data,
        });
    }
    update(key, input) {
        validators.validateUpdateEntityData(this, input);
        const [record] = this.adapter.update({
            where: {
                byKey: key,
            },
            data: input,
        });
        return record || null;
    }
    get(key) {
        const [record] = this.adapter.find({
            where: {
                byKey: key,
            },
        });
        return record || null;
    }
    get$(key) {
        let ob$ = this.subscribedKeys.get(key);
        if (!ob$) {
            ob$ = new Observable(subscriber => {
                const unsubscribe = this.adapter.observe({
                    where: {
                        byKey: key,
                    },
                    callback: ([data]) => {
                        subscriber.next(data || null);
                    },
                });
                return () => {
                    unsubscribe();
                    this.subscribedKeys.delete(key);
                };
            }).pipe(shareReplay({
                refCount: true,
                bufferSize: 1,
            }));
            this.subscribedKeys.set(key, ob$);
        }
        return ob$;
    }
    find(where) {
        return this.adapter.find({
            where: !where
                ? undefined
                : Object.entries(where)
                    .map(([field, value]) => ({
                    field,
                    value,
                }))
                    .filter(({ value }) => value !== undefined),
        });
    }
    find$(where) {
        return new Observable(subscriber => {
            const unsubscribe = this.adapter.observe({
                where: !where
                    ? undefined
                    : Object.entries(where)
                        .map(([field, value]) => ({
                        field,
                        value,
                    }))
                        .filter(({ value }) => value !== undefined),
                callback: data => {
                    subscriber.next(data);
                },
            });
            return unsubscribe;
        });
    }
    select(selectKey, where) {
        const items = this.adapter.find({
            where: !where
                ? undefined
                : Object.entries(where)
                    .map(([field, value]) => ({
                    field,
                    value,
                }))
                    .filter(({ value }) => value !== undefined),
        });
        return items.map(item => {
            const { [this.keyField]: key, [selectKey]: selected } = item;
            return {
                [this.keyField]: key,
                [selectKey]: selected,
            };
        });
    }
    select$(selectKey, where) {
        return new Observable(subscriber => {
            const unsubscribe = this.adapter.observe({
                where: !where
                    ? undefined
                    : Object.entries(where)
                        .map(([field, value]) => ({
                        field,
                        value,
                    }))
                        .filter(({ value }) => value !== undefined),
                select: [this.keyField, selectKey],
                callback: data => {
                    subscriber.next(data.map(item => {
                        const { [this.keyField]: key, [selectKey]: selected } = item;
                        return {
                            [this.keyField]: key,
                            [selectKey]: selected,
                        };
                    }));
                },
            });
            return unsubscribe;
        });
    }
    keys() {
        return this.adapter.find({
            select: 'key',
        });
    }
    keys$() {
        let ob$ = this.subscribedKeys.get('$$KEYS');
        if (!ob$) {
            ob$ = new Observable(subscriber => {
                const unsubscribe = this.adapter.observe({
                    select: 'key',
                    callback: (keys) => {
                        subscriber.next(keys);
                    },
                });
                return () => {
                    unsubscribe();
                    this.subscribedKeys.delete('$$KEYS');
                };
            }).pipe(shareReplay({
                refCount: true,
                bufferSize: 1,
            }));
            this.subscribedKeys.set('$$KEYS', ob$);
        }
        return ob$;
    }
    delete(key) {
        this.adapter.delete({
            where: {
                byKey: key,
            },
        });
    }
}
//# sourceMappingURL=table.js.map