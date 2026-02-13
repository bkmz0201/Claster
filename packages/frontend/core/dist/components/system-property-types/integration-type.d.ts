import type { FilterParams } from '@affine/core/modules/collection-rules';
import type { DocRecord } from '@affine/core/modules/doc';
import type { GroupHeaderProps } from '../explorer/types';
export declare const IntegrationTypeFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const IntegrationTypeDocListProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const IntegrationTypeGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=integration-type.d.ts.map