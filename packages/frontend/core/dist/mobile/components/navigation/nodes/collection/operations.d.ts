import type { NodeOperation } from '@affine/core/desktop/components/navigation-panel';
export declare const useNavigationPanelCollectionNodeOperations: (collectionId: string, onOpenCollapsed: () => void, onOpenEdit: () => void) => {
    favorite: boolean;
    handleAddDocToCollection: () => void;
    handleDeleteCollection: () => void;
    handleOpenInNewTab: () => void;
    handleOpenInSplitView: () => void;
    handleShowEdit: () => void;
    handleToggleFavoriteCollection: () => void;
    handleRename: (name: string) => void;
};
export declare const useNavigationPanelCollectionNodeOperationsMenu: (collectionId: string, onOpenCollapsed: () => void, onOpenEdit: () => void) => NodeOperation[];
//# sourceMappingURL=operations.d.ts.map