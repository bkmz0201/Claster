import { type ReactNode, type RefObject } from 'react';
import type { ImperativePanelHandle } from 'react-resizable-panels';
export type SinglePanelContextType = {
    isOpen: boolean;
    panelContent: ReactNode;
    setPanelContent: (content: ReactNode) => void;
    togglePanel: () => void;
    openPanel: () => void;
    closePanel: () => void;
};
export interface PanelContextType {
    leftPanel: SinglePanelContextType;
    rightPanel: SinglePanelContextType;
}
export type ResizablePanelProps = {
    panelRef: RefObject<ImperativePanelHandle>;
    onExpand: () => void;
    onCollapse: () => void;
};
export declare const PanelContext: import("react").Context<PanelContextType | undefined>;
export declare const usePanelContext: () => PanelContextType;
export declare const useLeftPanel: () => SinglePanelContextType;
export declare const useRightPanel: () => SinglePanelContextType;
//# sourceMappingURL=context.d.ts.map