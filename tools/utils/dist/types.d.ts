export interface YarnWorkspaceItem {
    name: string;
    location: string;
    workspaceDependencies: string[];
    mismatchedWorkspaceDependencies?: string[];
}
export interface CommonPackageJsonContent {
    name: string;
    type?: 'module' | 'commonjs';
    version: string;
    private?: boolean;
    dependencies?: {
        [key: string]: string;
    };
    devDependencies?: {
        [key: string]: string;
    };
    scripts?: {
        [key: string]: string;
    };
    main?: string;
    exports?: {
        [key: string]: string | {
            [key: string]: string;
        };
    };
}
//# sourceMappingURL=types.d.ts.map