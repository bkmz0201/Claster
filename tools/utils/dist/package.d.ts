import { type Path } from './path';
import type { CommonPackageJsonContent, YarnWorkspaceItem } from './types';
import type { Workspace } from './workspace';
import { type PackageName } from './yarn';
export declare function readPackageJson(path: Path): CommonPackageJsonContent;
export declare class Package {
    readonly name: PackageName;
    readonly packageJson: CommonPackageJsonContent;
    readonly dirname: string;
    readonly path: Path;
    readonly srcPath: Path;
    readonly nodeModulesPath: Path;
    readonly libPath: Path;
    readonly distPath: Path;
    readonly version: string;
    readonly isTsProject: boolean;
    readonly workspaceDependencies: string[];
    readonly deps: Package[];
    private _workspace;
    get entry(): string | {
        [key: string]: string;
    } | undefined;
    get dependencies(): {
        [key: string]: string;
    };
    get devDependencies(): {
        [key: string]: string;
    };
    get workspace(): Workspace;
    private set workspace(value);
    constructor(name: PackageName, meta?: YarnWorkspaceItem);
    get scripts(): {
        [key: string]: string;
    };
    join(...paths: string[]): Path;
}
//# sourceMappingURL=package.d.ts.map