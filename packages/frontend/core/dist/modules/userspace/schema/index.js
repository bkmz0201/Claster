import { f } from '@toeverything/infra';
export const USER_DB_SCHEMA = {
    editorSetting: {
        key: f.string().primaryKey(),
        value: f.string(),
    },
};
//# sourceMappingURL=index.js.map