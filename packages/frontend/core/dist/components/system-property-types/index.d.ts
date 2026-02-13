import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { DocRecord } from '@affine/core/modules/doc';
import type { I18nString } from '@affine/i18n';
import type { GroupHeaderProps } from '../explorer/types';
export declare const SystemPropertyTypes: {
    [type: string]: {
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        name: I18nString;
        allowInOrderBy?: boolean;
        allowInGroupBy?: boolean;
        filterMethod?: {
            [key: string]: I18nString;
        };
        filterValue?: React.FC<{
            filter: FilterParams;
            isDraft?: boolean;
            onDraftCompleted?: () => void;
            onChange?: (filter: FilterParams) => void;
        }>;
        defaultFilter?: Omit<FilterParams, "type" | "key">;
        /**
         * Whether to show the property in the doc list,
         * - `inline`: show the property in the doc list inline
         * - `stack`: show as tags
         */
        showInDocList?: "inline" | "stack";
        docListProperty?: React.FC<{
            doc: DocRecord;
        }>;
        groupHeader?: React.FC<GroupHeaderProps>;
    };
};
export type SystemPropertyType = keyof typeof SystemPropertyTypes;
export declare const isSupportedSystemPropertyType: (type?: string) => boolean;
//# sourceMappingURL=index.d.ts.map