export class FieldSchemaBuilder {
    constructor(type, values) {
        this.schema = {
            type: 'string',
            optional: false,
            isPrimaryKey: false,
            default: undefined,
            values: undefined,
        };
        this.schema.type = type;
        this.schema.values = values;
    }
    optional() {
        this.schema.optional = true;
        return this;
    }
    default(value) {
        this.schema.default = value;
        this.schema.optional = true;
        return this;
    }
    primaryKey() {
        this.schema.isPrimaryKey = true;
        return this;
    }
}
export const f = {
    string: () => new FieldSchemaBuilder('string'),
    number: () => new FieldSchemaBuilder('number'),
    boolean: () => new FieldSchemaBuilder('boolean'),
    json: () => new FieldSchemaBuilder('json'),
    enum: (...values) => new FieldSchemaBuilder('enum', values),
};
export const t = {
    document: (schema) => {
        return {
            ...schema,
            __document: new FieldSchemaBuilder('boolean').optional(),
        };
    },
};
//# sourceMappingURL=schema.js.map