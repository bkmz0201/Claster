import { Entity } from '@toeverything/infra';
import { type UserDbSchema } from '../schema';
import { UserDBEngine } from './user-db-engine';
import { UserDBTable } from './user-db-table';
export declare class UserDB extends Entity<{
    userId: string;
}> {
    readonly engine: UserDBEngine;
    readonly db: import("@toeverything/infra").TableMap<{
        readonly editorSetting: {
            readonly key: import("@toeverything/infra").FieldSchemaBuilder<string, false, true>;
            readonly value: import("@toeverything/infra").FieldSchemaBuilder<string, false, false>;
        };
    }> & import("@toeverything/infra").ORMClient;
    constructor();
    dispose(): void;
}
export type UserDBWithTables = UserDB & {
    [K in keyof UserDbSchema]: UserDBTable<UserDbSchema[K]>;
};
//# sourceMappingURL=user-db.d.ts.map