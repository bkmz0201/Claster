import type { FilterParams } from '@affine/core/modules/collection-rules';
import { type DocRecord } from '@affine/core/modules/doc';
import type { GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const TagsValue: ({ readonly }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const TagsFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element | undefined;
export declare const TagsDocListProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element;
export declare const TagsGroupHeader: ({ groupId, docCount }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tags.d.ts.map