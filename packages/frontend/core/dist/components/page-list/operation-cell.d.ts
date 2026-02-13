import type { DocMeta } from '@blocksuite/affine/store';
import { type CollectionMeta } from '../../modules/collection';
import type { TagMeta } from './types';
export interface PageOperationCellProps {
    page: DocMeta;
    isInAllowList?: boolean;
    onRemoveFromAllowList?: () => void;
}
export declare const PageOperationCell: ({ isInAllowList, page, onRemoveFromAllowList, }: PageOperationCellProps) => import("react/jsx-runtime").JSX.Element;
export interface TrashOperationCellProps {
    onPermanentlyDeletePage: () => void;
    onRestorePage: () => void;
}
export declare const TrashOperationCell: ({ onPermanentlyDeletePage, onRestorePage, }: TrashOperationCellProps) => import("react/jsx-runtime").JSX.Element;
export interface CollectionOperationCellProps {
    collectionMeta: CollectionMeta;
}
export declare const CollectionOperationCell: ({ collectionMeta, }: CollectionOperationCellProps) => import("react/jsx-runtime").JSX.Element;
interface TagOperationCellProps {
    tag: TagMeta;
    onTagDelete: (tagId: string[]) => void;
}
export declare const TagOperationCell: ({ tag, onTagDelete, }: TagOperationCellProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=operation-cell.d.ts.map