import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { DocListPropertyProps, GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const DocPrimaryModeValue: ({ onChange, readonly, }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const DocPrimaryModeFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DocPrimaryModeDocListProperty: ({ doc, }: DocListPropertyProps) => import("react/jsx-runtime").JSX.Element;
export declare const DocPrimaryModeGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=doc-primary-mode.d.ts.map