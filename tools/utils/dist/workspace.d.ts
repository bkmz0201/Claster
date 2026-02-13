import { Package } from './package';
import type { CommonPackageJsonContent } from './types';
import { PackageList, type PackageName, yarnList } from './yarn';
export declare class Workspace {
    static PackageNames: PackageName[];
    readonly packages: Package[];
    readonly packageJson: CommonPackageJsonContent;
    private readonly logger;
    readonly path: import("./path").Path;
    get version(): string;
    get devDependencies(): {
        [key: string]: string;
    };
    get dependencies(): {
        [key: string]: string;
    };
    get isTsProject(): boolean;
    constructor(list?: typeof PackageList);
    tryGetPackage(name: PackageName): Package | undefined;
    getPackage(name: PackageName): Package;
    join(...paths: string[]): import("./path").Path;
    buildDeps(pkg: Package, packages: Map<string, Package>, building: Set<string>): void;
    forEach(callback: (pkg: Package) => void): void;
}
export { Package, type PackageName, yarnList };
//# sourceMappingURL=workspace.d.ts.map