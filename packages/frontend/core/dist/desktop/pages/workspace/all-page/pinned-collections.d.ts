import { type PinnedCollectionRecord } from '@affine/core/modules/collection';
import type { FilterParams } from '@affine/core/modules/collection-rules';
export declare const PinnedCollectionItem: ({ record, isActive, onClick, onClickRemove, }: {
    record: PinnedCollectionRecord;
    onClickRemove: () => void;
    isActive: boolean;
    onClick: () => void;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const PinnedCollections: ({ activeCollectionId, onActiveAll, onActiveCollection, onAddFilter, hiddenAdd, }: {
    activeCollectionId: string | null;
    onActiveAll: () => void;
    onActiveCollection: (collectionId: string) => void;
    onAddFilter: (params: FilterParams) => void;
    hiddenAdd?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export declare const AddPinnedCollection: ({ onPinCollection, onAddFilter, }: {
    onPinCollection: (collectionId: string) => void;
    onAddFilter: (params: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const AddPinnedCollectionMenuContent: ({ onPinCollection, onAddFilter, }: {
    onPinCollection: (collectionId: string) => void;
    onAddFilter: (params: FilterParams) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=pinned-collections.d.ts.map