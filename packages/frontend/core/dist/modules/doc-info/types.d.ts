import type { DatabaseBlockDataSource } from '@blocksuite/affine/blocks/database';
import type { LiveData } from '@toeverything/infra';
import type { Doc } from '../doc';
export type DatabaseProperty<Data = Record<string, unknown>> = {
    id: string;
    name$: LiveData<string | undefined>;
    type$: LiveData<string | undefined>;
    data$: LiveData<Data | undefined>;
};
export interface DatabaseValueCell<T = unknown, Data = Record<string, unknown>> {
    value$: LiveData<T>;
    property: DatabaseProperty<Data>;
    id: string;
}
export interface DatabaseRow {
    cells: DatabaseValueCell[];
    id: string;
    doc: Doc;
    docId: string;
    dataSource: DatabaseBlockDataSource;
    databaseId: string;
    databaseName: string;
}
export interface DatabaseCellRendererProps {
    rowId: string;
    cell: DatabaseValueCell;
    dataSource: DatabaseBlockDataSource;
    onChange: (value: unknown) => void;
}
//# sourceMappingURL=types.d.ts.map