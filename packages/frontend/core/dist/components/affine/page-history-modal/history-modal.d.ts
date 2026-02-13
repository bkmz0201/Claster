import type { Workspace } from '@blocksuite/affine/store';
export interface PageHistoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    docCollection: Workspace;
    pageId: string;
}
export declare const PageHistoryModal: ({ onOpenChange, open, pageId, docCollection: workspace, }: PageHistoryModalProps) => import("react/jsx-runtime").JSX.Element;
export declare const GlobalPageHistoryModal: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=history-modal.d.ts.map