import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const NumberValue: ({ value, onChange, readonly, }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const NumberFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const NumberDocListProperty: ({ value }: {
    value: number;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const NumberGroupHeader: ({ groupId, docCount }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=number.d.ts.map