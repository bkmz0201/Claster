export interface AffineThemePlugin {
    onThemeChanged(options: {
        darkMode: boolean;
    }): Promise<void>;
    getSystemNavBarHeight(): Promise<{
        height: number;
    }>;
}
//# sourceMappingURL=definitions.d.ts.map