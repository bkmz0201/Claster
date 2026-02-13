import { Package } from '@affine-tools/utils/workspace';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { PackageCommand } from './command';
export declare class BundleCommand extends PackageCommand {
    static paths: string[][];
    _deps: boolean;
    waitDeps: boolean;
    dev: boolean;
    execute(): Promise<void>;
    static build(pkg: Package): Promise<void>;
    static dev(pkg: Package, devServerConfig?: DevServerConfiguration): Promise<void>;
}
//# sourceMappingURL=bundle.d.ts.map