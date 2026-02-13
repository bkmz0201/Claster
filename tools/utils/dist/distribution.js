import { PackageList } from './yarn';
export const PackageToDistribution = new Map([
    ['@affine/admin', 'admin'],
    ['@affine/web', 'web'],
    ['@affine/electron-renderer', 'desktop'],
    ['@affine/electron', 'desktop'],
    ['@affine/mobile', 'mobile'],
    ['@affine/ios', 'ios'],
    ['@affine/android', 'android'],
]);
export const AliasToPackage = new Map([
    ['admin', '@affine/admin'],
    ['web', '@affine/web'],
    ['electron', '@affine/electron'],
    ['desktop', '@affine/electron-renderer'],
    ['renderer', '@affine/electron-renderer'],
    ['mobile', '@affine/mobile'],
    ['ios', '@affine/ios'],
    ['android', '@affine/android'],
    ['server', '@affine/server'],
    ['gql', '@affine/graphql'],
    ...PackageList.map(pkg => [pkg.name.split('/').pop(), pkg.name]),
]);
//# sourceMappingURL=distribution.js.map