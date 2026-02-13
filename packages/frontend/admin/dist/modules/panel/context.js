import { createContext, useContext, } from 'react';
export const PanelContext = createContext(undefined);
export const usePanelContext = () => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error('usePanelContext must be used within a PanelProvider');
    }
    return context;
};
export const useLeftPanel = () => {
    const context = usePanelContext();
    return context.leftPanel;
};
export const useRightPanel = () => {
    const context = usePanelContext();
    return context.rightPanel;
};
//# sourceMappingURL=context.js.map