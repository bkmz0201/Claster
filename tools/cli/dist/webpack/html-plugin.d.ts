import type { WebpackPluginInstance } from 'webpack';
export declare const getPublicPath: (BUILD_CONFIG: BUILD_CONFIG_TYPE) => string;
export interface CreateHTMLPluginConfig {
    filename?: string;
    additionalEntryForSelfhost?: boolean;
    injectGlobalErrorHandler?: boolean;
    emitAssetsManifest?: boolean;
}
export declare function createHTMLPlugins(BUILD_CONFIG: BUILD_CONFIG_TYPE, config: CreateHTMLPluginConfig): WebpackPluginInstance[];
//# sourceMappingURL=html-plugin.d.ts.map