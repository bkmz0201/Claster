import { Package } from '@affine-tools/utils/workspace';
import webpack from 'webpack';
import { type CreateHTMLPluginConfig } from './html-plugin.js';
export declare function createHTMLTargetConfig(pkg: Package, entry: string | Record<string, string>, htmlConfig?: Partial<CreateHTMLPluginConfig>, deps?: string[]): webpack.Configuration;
export declare function createWorkerTargetConfig(pkg: Package, entry: string): Omit<webpack.Configuration, 'name'> & {
    name: string;
};
export declare function createNodeTargetConfig(pkg: Package, entry: string): Omit<webpack.Configuration, 'name'> & {
    name: string;
};
//# sourceMappingURL=index.d.ts.map