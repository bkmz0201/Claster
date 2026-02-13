import type { FilterParams } from '@affine/core/modules/collection-rules';
import { type DocRecord } from '@affine/core/modules/doc';
import type { GroupHeaderProps } from '../explorer/types';
export declare const CreatedByValue: () => import("react/jsx-runtime").JSX.Element;
export declare const UpdatedByValue: () => import("react/jsx-runtime").JSX.Element;
export declare const CreatedByUpdatedByFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const CreatedByDocListInlineProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element;
export declare const UpdatedByDocListInlineProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element;
export declare const ModifiedByGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=created-updated-by.d.ts.map