import type { TableSchemaValidator } from './types';
interface DataValidator {
    validate(tableName: string, data: any): void;
}
export declare const yjsTableSchemaValidators: Record<string, TableSchemaValidator>;
export declare const yjsDataValidators: Record<string, DataValidator>;
export {};
//# sourceMappingURL=yjs.d.ts.map