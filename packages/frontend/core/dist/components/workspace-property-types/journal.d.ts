import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { DocListPropertyProps, GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const JournalValue: ({ readonly }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const JournalFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const JournalDocListProperty: ({ doc }: DocListPropertyProps) => import("react/jsx-runtime").JSX.Element | null;
export declare const JournalGroupHeader: ({ groupId, docCount }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=journal.d.ts.map