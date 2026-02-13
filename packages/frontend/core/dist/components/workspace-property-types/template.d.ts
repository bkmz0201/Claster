import type { FilterParams } from '@affine/core/modules/collection-rules';
import { type DocRecord } from '@affine/core/modules/doc';
import type { GroupHeaderProps } from '../explorer/types';
import type { PropertyValueProps } from '../properties/types';
export declare const TemplateValue: ({ readonly }: PropertyValueProps) => import("react/jsx-runtime").JSX.Element;
export declare const TemplateDocListProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const TemplateGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const TemplateFilterValue: ({ filter, isDraft, onDraftCompleted, onChange, }: {
    filter: FilterParams;
    isDraft?: boolean;
    onDraftCompleted?: () => void;
    onChange?: (filter: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=template.d.ts.map