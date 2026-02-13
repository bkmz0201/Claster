import type { Package } from '@affine-tools/utils/workspace';
export interface BuildFlags {
    channel: 'stable' | 'beta' | 'internal' | 'canary';
    mode: 'development' | 'production';
}
export declare function getBuildConfig(pkg: Package, buildFlags: BuildFlags): BUILD_CONFIG_TYPE;
//# sourceMappingURL=build-config.d.ts.map