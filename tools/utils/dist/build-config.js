import { PackageToDistribution } from './distribution';
export function getBuildConfig(pkg, buildFlags) {
    const distribution = PackageToDistribution.get(pkg.name);
    if (!distribution) {
        throw new Error(`Distribution for ${pkg.name} is not found`);
    }
    const buildPreset = {
        get stable() {
            return {
                debug: buildFlags.mode === 'development',
                distribution,
                isDesktopEdition: ['web', 'desktop', 'admin'].includes(distribution),
                isMobileEdition: ['mobile', 'ios', 'android'].includes(distribution),
                isElectron: distribution === 'desktop',
                isWeb: distribution === 'web',
                isMobileWeb: distribution === 'mobile',
                isIOS: distribution === 'ios',
                isAndroid: distribution === 'android',
                isNative: distribution === 'desktop' ||
                    distribution === 'ios' ||
                    distribution === 'android',
                isAdmin: distribution === 'admin',
                appBuildType: 'stable',
                appVersion: pkg.version,
                // editorVersion: pkg.dependencies['@blocksuite/affine'],
                editorVersion: pkg.version,
                githubUrl: 'https://github.com/toeverything/AFFiNE',
                changelogUrl: 'https://affine.pro/what-is-new',
                downloadUrl: 'https://affine.pro/download',
                pricingUrl: 'https://affine.pro/pricing',
                discordUrl: 'https://affine.pro/redirect/discord',
                requestLicenseUrl: 'https://affine.pro/redirect/license',
                imageProxyUrl: '/api/worker/image-proxy',
                linkPreviewUrl: '/api/worker/link-preview',
                CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY ?? '',
                SENTRY_DSN: process.env.SENTRY_DSN ?? '',
                MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN ?? '',
                DEBUG_JOTAI: process.env.DEBUG_JOTAI ?? '',
            };
        },
        get beta() {
            return {
                ...this.stable,
                appBuildType: 'beta',
                changelogUrl: 'https://github.com/toeverything/AFFiNE/releases',
            };
        },
        get internal() {
            return {
                ...this.stable,
                appBuildType: 'internal',
                changelogUrl: 'https://github.com/toeverything/AFFiNE/releases',
            };
        },
        // canary will be aggressive and enable all features
        get canary() {
            return {
                ...this.stable,
                appBuildType: 'canary',
                changelogUrl: 'https://github.com/toeverything/AFFiNE/releases',
            };
        },
    };
    const currentBuild = buildFlags.channel;
    if (!(currentBuild in buildPreset)) {
        throw new Error(`BUILD_TYPE ${currentBuild} is not supported`);
    }
    const currentBuildPreset = buildPreset[currentBuild];
    const environmentPreset = {
        changelogUrl: process.env.CHANGELOG_URL ?? currentBuildPreset.changelogUrl,
    };
    return {
        ...currentBuildPreset,
        // environment preset will overwrite current build preset
        // this environment variable is for debug proposes only
        // do not put them into CI
        ...(process.env.CI ? {} : environmentPreset),
    };
}
//# sourceMappingURL=build-config.js.map