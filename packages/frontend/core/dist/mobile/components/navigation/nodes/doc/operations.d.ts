import type { NodeOperation } from '@affine/core/desktop/components/navigation-panel';
export declare const useNavigationPanelDocNodeOperations: (docId: string, options: {
    openNodeCollapsed: () => void;
}) => {
    favorite: boolean;
    handleAddLinkedPage: () => void;
    handleDuplicate: () => void;
    handleToggleFavoriteDoc: () => void;
    handleOpenInSplitView: () => void;
    handleOpenInNewTab: () => void;
    handleMoveToTrash: () => void;
    handleRename: (newName: string) => void;
};
export declare const useNavigationPanelDocNodeOperationsMenu: (docId: string, options: {
    openInfoModal: () => void;
    openNodeCollapsed: () => void;
}) => NodeOperation[];
//# sourceMappingURL=operations.d.ts.map