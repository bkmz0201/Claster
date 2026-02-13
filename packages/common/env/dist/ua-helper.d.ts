export declare class UaHelper {
    private readonly navigator;
    private readonly uaMap;
    isLinux: boolean;
    isMacOs: boolean;
    isSafari: boolean;
    isWindows: boolean;
    isFireFox: boolean;
    isMobile: boolean;
    isChrome: boolean;
    isIOS: boolean;
    isStandalone: boolean;
    getChromeVersion: () => number;
    constructor(navigator: Navigator);
    checkUseragent(isUseragent: keyof ReturnType<typeof getUa>): boolean;
    private isStandaloneMode;
    private initUaFlags;
}
declare const getUa: (navigator: Navigator) => {
    ua: string;
    mobile: boolean;
    android: boolean;
    ios: boolean;
    mac: boolean;
    wx: boolean;
    chrome: boolean;
    iphone: boolean;
    ipad: boolean;
    safari: boolean;
    tiktok: boolean;
    weibo: boolean;
    win: boolean;
    linux: boolean;
    firefox: boolean;
};
export {};
//# sourceMappingURL=ua-helper.d.ts.map