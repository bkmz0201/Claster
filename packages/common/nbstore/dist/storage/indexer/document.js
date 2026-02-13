export class IndexerDocument {
    constructor(id) {
        this.id = id;
        this.fields = new Map();
    }
    insert(field, value) {
        const values = this.fields.get(field) ?? [];
        if (Array.isArray(value)) {
            values.push(...value);
        }
        else {
            values.push(value);
        }
        this.fields.set(field, values);
    }
    get(field) {
        const values = this.fields.get(field);
        if (values === undefined) {
            return undefined;
        }
        else if (values.length === 1) {
            return values[0];
        }
        else {
            return values;
        }
    }
    static from(id, map) {
        const doc = new IndexerDocument(id);
        if (map instanceof Map) {
            for (const [key, value] of map) {
                doc.insert(key, value);
            }
        }
        else {
            for (const key in map) {
                if (map[key] === undefined || map[key] === null) {
                    continue;
                }
                doc.insert(key, map[key]);
            }
        }
        return doc;
    }
}
//# sourceMappingURL=document.js.map