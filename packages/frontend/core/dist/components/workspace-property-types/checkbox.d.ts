import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { DocListPropertyProps, GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const CheckboxValue: ({ value, onChange, readonly, }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const CheckboxFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const CheckboxDocListProperty: ({ value, propertyInfo, }: DocListPropertyProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const CheckboxGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=checkbox.d.ts.map