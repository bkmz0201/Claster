import type { NodeOperation } from '@affine/core/desktop/components/navigation-panel';
export declare const useNavigationPanelTagNodeOperations: (tagId: string, { openNodeCollapsed, }: {
    openNodeCollapsed: () => void;
}) => {
    favorite: import("../../../../../modules/favorite/stores/favorite").FavoriteRecord | undefined;
    handleNewDoc: () => void;
    handleMoveToTrash: () => void;
    handleOpenInSplitView: () => void;
    handleToggleFavoriteTag: () => void;
    handleOpenInNewTab: () => void;
    handleRename: (newName: string) => void;
    handleChangeColor: (color: string) => void;
    handleChangeNameOrColor: (name?: string, color?: string) => void;
    handleOpenDocSelector: () => void;
};
export declare const useNavigationPanelTagNodeOperationsMenu: (tagId: string, option: {
    openNodeCollapsed: () => void;
}) => NodeOperation[];
//# sourceMappingURL=operations.d.ts.map