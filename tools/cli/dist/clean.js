import { rmSync } from 'node:fs';
import { exec } from '@affine-tools/utils/process';
import { Command, Option } from './command';
export class CleanCommand extends Command {
    constructor() {
        super(...arguments);
        this.cleanDist = Option.Boolean('--dist', false);
        this.cleanRustTarget = Option.Boolean('--rust', false);
        this.cleanNodeModules = Option.Boolean('--node-modules', false);
        this.all = Option.Boolean('--all,-a', false);
    }
    static { this.paths = [['clean']]; }
    async execute() {
        this.logger.info('Cleaning Workspace...');
        if (this.all || this.cleanNodeModules) {
            this.doCleanNodeModules();
        }
        if (this.all || this.cleanDist) {
            this.doCleanDist();
        }
        if (this.all || this.cleanRustTarget) {
            this.doCleanRust();
        }
    }
    doCleanNodeModules() {
        this.logger.info('Cleaning node_modules...');
        const rootNodeModules = this.workspace.join('node_modules');
        if (rootNodeModules.isDirectory()) {
            this.logger.info(`Cleaning ${rootNodeModules}`);
            rmSync(rootNodeModules.value, { recursive: true });
        }
        this.workspace.forEach(pkg => {
            const nodeModules = pkg.nodeModulesPath;
            if (nodeModules.isDirectory()) {
                this.logger.info(`Cleaning ${nodeModules}`);
                rmSync(nodeModules.value, { recursive: true });
            }
        });
        this.logger.info('node_modules cleaned');
    }
    doCleanDist() {
        this.logger.info('Cleaning dist...');
        this.workspace.forEach(pkg => {
            if (pkg.distPath.isDirectory()) {
                this.logger.info(`Cleaning ${pkg.distPath}`);
                rmSync(pkg.distPath.value, { recursive: true });
            }
            if (pkg.libPath.isDirectory()) {
                this.logger.info(`Cleaning ${pkg.libPath}`);
                rmSync(pkg.libPath.value, { recursive: true });
            }
        });
        this.logger.info('dist cleaned');
    }
    doCleanRust() {
        exec('', 'cargo clean');
    }
}
//# sourceMappingURL=clean.js.map