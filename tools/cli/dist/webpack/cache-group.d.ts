export declare const productionCacheGroups: {
    i18n: {
        test: RegExp;
        name: (module: any) => string;
        priority: number;
        enforce: boolean;
    };
    asyncVendor: {
        test: RegExp;
        name(module: any): string;
        priority: number;
        chunks: "async";
    };
    blocksuite: {
        name: string;
        test: (module: any) => boolean;
        priority: number;
        enforce: boolean;
    };
    react: {
        name: string;
        test: (module: any) => boolean;
        priority: number;
        enforce: boolean;
    };
    jotai: {
        name: string;
        test: (module: any) => boolean;
        priority: number;
        enforce: boolean;
    };
    rxjs: {
        name: string;
        test: (module: any) => boolean;
        priority: number;
        enforce: boolean;
    };
    lodash: {
        name: string;
        test: (module: any) => boolean;
        priority: number;
        enforce: boolean;
    };
    emotion: {
        name: string;
        test: (module: any) => boolean;
        priority: number;
        enforce: boolean;
    };
    vendor: {
        name: string;
        test: RegExp;
        priority: number;
        enforce: boolean;
    };
    styles: {
        name: string;
        test: (module: any) => any;
        chunks: "all";
        minSize: number;
        minChunks: number;
        reuseExistingChunk: boolean;
        priority: number;
        enforce: boolean;
    };
};
//# sourceMappingURL=cache-group.d.ts.map