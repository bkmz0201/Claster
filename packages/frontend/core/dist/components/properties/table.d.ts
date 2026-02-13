import type { DocCustomPropertyInfo } from '@affine/core/modules/db';
import type { DatabaseRow, DatabaseValueCell } from '@affine/core/modules/doc-info/types';
import type React from 'react';
export type DefaultOpenProperty = {
    type: 'workspace';
} | {
    type: 'database';
    docId: string;
    databaseId: string;
    databaseRowId: string;
};
export interface WorkspacePropertiesTableProps {
    className?: string;
    defaultOpenProperty?: DefaultOpenProperty;
    onPropertyAdded?: (property: DocCustomPropertyInfo) => void;
    onPropertyChange?: (property: DocCustomPropertyInfo, value: unknown) => void;
    onPropertyInfoChange?: (property: DocCustomPropertyInfo, field: keyof DocCustomPropertyInfo, value: string) => void;
    onDatabasePropertyChange?: (row: DatabaseRow, cell: DatabaseValueCell, value: unknown) => void;
}
interface WorkspacePropertiesTableHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export declare const WorkspacePropertiesTableHeader: ({ className, style, open, onOpenChange, }: WorkspacePropertiesTableHeaderProps) => import("react/jsx-runtime").JSX.Element;
interface WorkspacePropertyRowProps {
    propertyInfo: DocCustomPropertyInfo;
    showAll?: boolean;
    defaultOpenEditMenu?: boolean;
    propertyInfoReadonly?: boolean;
    readonly?: boolean;
    onChange?: (value: unknown) => void;
    onPropertyInfoChange?: (field: keyof DocCustomPropertyInfo, value: string) => void;
}
export declare const WorkspacePropertyRow: ({ propertyInfo, defaultOpenEditMenu, onChange, propertyInfoReadonly, readonly, onPropertyInfoChange, }: WorkspacePropertyRowProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const WorkspacePropertiesTable: (props: WorkspacePropertiesTableProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=table.d.ts.map