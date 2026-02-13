import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { DocListPropertyProps, GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const DateValue: ({ value, onChange, readonly, }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const DateFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element | undefined;
export declare const DateDocListProperty: ({ value }: DocListPropertyProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const DateGroupHeader: ({ groupId, docCount }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=date.d.ts.map