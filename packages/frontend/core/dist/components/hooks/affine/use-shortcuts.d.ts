interface ShortcutMap {
    [x: string]: string[];
}
export interface ShortcutsInfo {
    title: string;
    shortcuts: ShortcutMap;
}
export declare const useWinGeneralKeyboardShortcuts: () => ShortcutMap;
export declare const useMacGeneralKeyboardShortcuts: () => ShortcutMap;
export declare const useMacEdgelessKeyboardShortcuts: () => ShortcutMap;
export declare const useWinEdgelessKeyboardShortcuts: () => ShortcutMap;
export declare const useMacPageKeyboardShortcuts: () => ShortcutMap;
export declare const useMacMarkdownShortcuts: () => ShortcutMap;
export declare const useWinPageKeyboardShortcuts: () => ShortcutMap;
export declare const useWinMarkdownShortcuts: () => ShortcutMap;
export declare const useMarkdownShortcuts: () => ShortcutsInfo;
export declare const usePageShortcuts: () => ShortcutsInfo;
export declare const useEdgelessShortcuts: () => ShortcutsInfo;
export declare const useGeneralShortcuts: () => ShortcutsInfo;
export {};
//# sourceMappingURL=use-shortcuts.d.ts.map