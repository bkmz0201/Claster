import { readFileSync } from 'node:fs';
import { parse } from 'node:path';
import { ProjectRoot } from './path';
import { PackageList } from './yarn';
export function readPackageJson(path) {
    const content = readFileSync(path.join('package.json').toString(), 'utf-8');
    return JSON.parse(content);
}
export class Package {
    get entry() {
        return this.packageJson.main || this.packageJson.exports?.['.'];
    }
    get dependencies() {
        return this.packageJson.dependencies || {};
    }
    get devDependencies() {
        return this.packageJson.devDependencies || {};
    }
    get workspace() {
        if (!this._workspace) {
            throw new Error('Workspace is not initialized');
        }
        return this._workspace;
    }
    set workspace(workspace) {
        this._workspace = workspace;
    }
    constructor(name, meta) {
        this.deps = [];
        this._workspace = null;
        this.name = name;
        meta ??= PackageList.find(item => item.name === name);
        // parse paths
        this.path = ProjectRoot.join(meta.location);
        this.dirname = parse(meta.location).name;
        this.srcPath = this.path.join('src');
        this.libPath = this.path.join('lib');
        this.distPath = this.path.join('dist');
        this.nodeModulesPath = this.path.join('node_modules');
        // parse workspace
        const packageJson = readPackageJson(this.path);
        this.packageJson = packageJson;
        this.version = packageJson.version;
        this.workspaceDependencies = meta.workspaceDependencies;
        this.isTsProject = this.path.join('tsconfig.json').isFile();
    }
    get scripts() {
        return this.packageJson.scripts || {};
    }
    join(...paths) {
        return this.path.join(...paths);
    }
}
//# sourceMappingURL=package.js.map