import { Logger } from './logger';
import { Package, readPackageJson } from './package';
import { ProjectRoot } from './path';
import { PackageList, yarnList } from './yarn';
class CircularDependenciesError extends Error {
    constructor(currentName) {
        super('Circular dependencies error');
        this.currentName = currentName;
    }
}
class ForbiddenPackageRefError extends Error {
    constructor(currentName, refName) {
        super(`Public package cannot reference private package. Found '${refName}' in dependencies of '${currentName}'`);
        this.currentName = currentName;
        this.refName = refName;
    }
}
export class Workspace {
    static { this.PackageNames = PackageList.map(p => p.name); }
    get version() {
        return this.packageJson.version;
    }
    get devDependencies() {
        return this.packageJson.devDependencies ?? {};
    }
    get dependencies() {
        return this.packageJson.dependencies ?? {};
    }
    get isTsProject() {
        return this.join('tsconfig.json').exists();
    }
    constructor(list = PackageList) {
        this.logger = new Logger('AFFiNE');
        this.path = ProjectRoot;
        this.packageJson = readPackageJson(ProjectRoot);
        const packages = new Map();
        for (const meta of list) {
            try {
                const pkg = new Package(meta.name, meta);
                // @ts-expect-error internal api
                pkg.workspace = this;
                packages.set(meta.location, pkg);
            }
            catch (e) {
                this.logger.error(e);
            }
        }
        const building = new Set();
        try {
            packages.forEach(pkg => this.buildDeps(pkg, packages, building));
        }
        catch (e) {
            if (e instanceof CircularDependenciesError) {
                const inProcessPackages = Array.from(building);
                console.log(inProcessPackages, e.currentName);
                const circle = inProcessPackages
                    .slice(inProcessPackages.indexOf(e.currentName))
                    .concat(e.currentName);
                this.logger.error(`Circular dependencies found: \n  ${circle.join(' -> ')}`);
                process.exit(1);
            }
            throw e;
        }
        this.packages = Array.from(packages.values());
    }
    tryGetPackage(name) {
        return this.packages.find(p => p.name === name);
    }
    getPackage(name) {
        const pkg = this.tryGetPackage(name);
        if (!pkg) {
            throw new Error(`Cannot find package with name '${name}'`);
        }
        return pkg;
    }
    join(...paths) {
        return this.path.join(...paths);
    }
    buildDeps(pkg, packages, building) {
        if (pkg.deps.length) {
            return;
        }
        building.add(pkg.name);
        // @ts-expect-error workspace is the builder for package deps
        pkg.deps = pkg.workspaceDependencies
            .map(relativeDepPath => {
            const dep = packages.get(relativeDepPath);
            if (!dep) {
                this.logger.error(`Cannot find package at ${relativeDepPath}. While build dependencies of ${pkg.name}`);
                return null;
            }
            if (building.has(dep.name)) {
                throw new CircularDependenciesError(dep.name);
            }
            if (!pkg.packageJson.private && dep.packageJson.private) {
                throw new ForbiddenPackageRefError(pkg.name, dep.name);
            }
            this.buildDeps(dep, packages, building);
            return dep;
        })
            .filter(Boolean);
        building.delete(pkg.name);
    }
    forEach(callback) {
        this.packages.forEach(callback);
    }
}
export { Package, yarnList };
//# sourceMappingURL=workspace.js.map