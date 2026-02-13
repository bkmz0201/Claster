import { createContext, useCallback, useContext, } from 'react';
export const MobileMenuContext = createContext({
    subMenus: [],
    setSubMenus: () => { },
});
export const useMobileSubMenuHelper = (contextValue) => {
    const _context = useContext(MobileMenuContext);
    const { subMenus, setSubMenus } = contextValue ?? _context;
    const addSubMenu = useCallback((subMenu) => {
        const id = subMenu.id;
        // if the submenu already exists, do nothing
        if (subMenus.some(sub => sub.id === id)) {
            return;
        }
        subMenu.options?.onOpenChange?.(true);
        setSubMenus(prev => {
            return [...prev, subMenu];
        });
    }, [setSubMenus, subMenus]);
    const removeSubMenu = useCallback((id) => {
        setSubMenus(prev => {
            const index = prev.findIndex(sub => sub.id === id);
            prev[index]?.options?.onOpenChange?.(false);
            return prev.filter(sub => sub.id !== id);
        });
    }, [setSubMenus]);
    const removeAllSubMenus = useCallback(() => {
        setSubMenus([]);
    }, [setSubMenus]);
    return {
        addSubMenu,
        removeSubMenu,
        removeAllSubMenus,
    };
};
//# sourceMappingURL=context.js.map