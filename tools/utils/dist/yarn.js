import { once } from 'lodash-es';
import { Logger } from './logger';
import { exec } from './process';
async function loadPackageList() {
    try {
        const packageList = await import('./workspace.gen');
        return packageList.PackageList;
    }
    catch (e) {
        console.log(e);
        new Logger('yarn').error('Failed to load package list');
        return [];
    }
}
export const PackageList = await loadPackageList();
export const yarnList = once(() => {
    const output = exec('', 'yarn workspaces list -v --json', { silent: true });
    let packageList = JSON.parse(`[${output.trim().replace(/\r\n|\n/g, ',')}]`);
    packageList.forEach(p => {
        p.location = p.location.replaceAll(/\\/g, '/');
        delete p['mismatchedWorkspaceDependencies'];
    });
    // ignore root package
    return packageList.filter(p => p.location !== '.');
});
//# sourceMappingURL=yarn.js.map