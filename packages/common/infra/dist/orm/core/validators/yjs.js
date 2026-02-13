const PRESERVED_FIELDS = ['$$DELETED'];
export const yjsTableSchemaValidators = {
    UsePreservedFields: {
        validate(tableName, table) {
            for (const name in table) {
                if (PRESERVED_FIELDS.includes(name)) {
                    throw new Error(`[Table(${tableName})]: Field '${name}' is reserved keyword and can't be used.`);
                }
            }
        },
    },
};
export const yjsDataValidators = {
    SetPreservedFields: {
        validate(tableName, data) {
            for (const name of PRESERVED_FIELDS) {
                if (data[name] !== undefined) {
                    throw new Error(`[Table(${tableName})]: Field '${name}' is reserved keyword and can't be set.`);
                }
            }
        },
    },
};
//# sourceMappingURL=yjs.js.map