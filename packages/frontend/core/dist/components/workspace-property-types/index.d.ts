import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { WorkspacePropertyFilter, WorkspacePropertyType } from '@affine/core/modules/workspace-property';
import type { I18nString } from '@affine/i18n';
import type { DocListPropertyProps, GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const DateFilterMethod: {
    readonly after: "com.affine.filter.after";
    readonly before: "com.affine.filter.before";
    readonly between: "com.affine.filter.between";
    readonly 'last-3-days': "com.affine.filter.last 3 days";
    readonly 'last-7-days': "com.affine.filter.last 7 days";
    readonly 'last-15-days': "com.affine.filter.last 15 days";
    readonly 'last-30-days': "com.affine.filter.last 30 days";
    readonly 'this-week': "com.affine.filter.this week";
    readonly 'this-month': "com.affine.filter.this month";
    readonly 'this-quarter': "com.affine.filter.this quarter";
    readonly 'this-year': "com.affine.filter.this year";
};
export declare const WorkspacePropertyTypes: { [type in WorkspacePropertyType]: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    value?: React.FC<PropertyValueProps>;
    allowInOrderBy?: boolean;
    allowInGroupBy?: boolean;
    filterMethod?: { [key in WorkspacePropertyFilter<type>]: I18nString; };
    filterValue?: React.FC<{
        filter: FilterParams;
        isDraft?: boolean;
        onChange?: (filter: FilterParams) => void;
    }>;
    defaultFilter?: Omit<FilterParams, "type" | "key">;
    /**
     * set a unique id for property type, make the property type can only be created once.
     */
    uniqueId?: string;
    name: I18nString;
    renameable?: boolean;
    description?: I18nString;
    /**
     * Whether to show the property in the doc list,
     * - `inline`: show the property in the doc list inline
     * - `stack`: show as tags
     */
    showInDocList?: "inline" | "stack";
    docListProperty?: React.FC<DocListPropertyProps>;
    groupHeader?: React.FC<GroupHeaderProps>;
}; };
export declare const isSupportedWorkspacePropertyType: (type?: string) => type is WorkspacePropertyType;
//# sourceMappingURL=index.d.ts.map