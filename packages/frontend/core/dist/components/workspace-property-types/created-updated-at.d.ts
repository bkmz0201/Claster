import { type DocRecord } from '@affine/core/modules/doc';
import type { GroupHeaderProps } from '../explorer/types';
export declare const CreateAtValue: () => import("react/jsx-runtime").JSX.Element;
export declare const UpdatedAtValue: () => import("react/jsx-runtime").JSX.Element;
export declare const CreatedAtGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const UpdatedAtGroupHeader: ({ groupId, docCount, }: GroupHeaderProps) => import("react/jsx-runtime").JSX.Element;
export declare const CreateAtDocListProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const UpdatedAtDocListProperty: ({ doc }: {
    doc: DocRecord;
}) => import("react/jsx-runtime").JSX.Element | null;
export { DateFilterValue as CreatedAtFilterValue } from './date';
export { DateFilterValue as UpdatedAtFilterValue } from './date';
//# sourceMappingURL=created-updated-at.d.ts.map