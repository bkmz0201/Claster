import { createEntityDataValidators, updateEntityDataValidators } from './data';
import { tableSchemaValidators } from './schema';
import { yjsDataValidators, yjsTableSchemaValidators } from './yjs';
function throwIfError(errors) {
    if (errors.length) {
        const message = errors
            .map(({ code, error }) => `${code}: ${error.stack ?? error.message}`)
            .join('\n');
        throw new Error('Validation Failed Error\n' + message);
    }
}
function validate(rules, ...payload) {
    const errors = [];
    for (const [code, validator] of Object.entries(rules)) {
        try {
            validator.validate(...payload);
        }
        catch (e) {
            errors.push({ code, error: e });
        }
    }
    throwIfError(errors);
}
function use(rules) {
    return (...payload) => validate(rules, ...payload);
}
export const validators = {
    validateTableSchema: use(tableSchemaValidators),
    validateCreateEntityData: use(createEntityDataValidators),
    validateUpdateEntityData: use(updateEntityDataValidators),
    validateYjsTableSchema: use(yjsTableSchemaValidators),
    validateYjsEntityData: use(yjsDataValidators),
};
//# sourceMappingURL=index.js.map