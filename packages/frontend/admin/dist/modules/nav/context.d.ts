interface NavContextType {
    activeTab: string;
    activeSubTab: string;
    currentModule: string;
    setActiveTab: (tab: string) => void;
    setActiveSubTab: (tab: string) => void;
    setCurrentModule: (module: string) => void;
}
export declare const NavContext: import("react").Context<NavContextType | undefined>;
export declare const useNav: () => NavContextType;
export {};
//# sourceMappingURL=context.d.ts.map