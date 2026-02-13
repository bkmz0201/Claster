export class UaHelper {
    constructor(navigator) {
        this.navigator = navigator;
        this.isLinux = false;
        this.isMacOs = false;
        this.isSafari = false;
        this.isWindows = false;
        this.isFireFox = false;
        this.isMobile = false;
        this.isChrome = false;
        this.isIOS = false;
        this.isStandalone = false;
        this.getChromeVersion = () => {
            let raw = this.navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            if (!raw) {
                raw = this.navigator.userAgent.match(/(CriOS)\/([0-9]+)/);
            }
            if (!raw) {
                console.error('Cannot get chrome version');
                return 0;
            }
            return parseInt(raw[2] ?? '', 10);
        };
        this.uaMap = getUa(navigator);
        this.initUaFlags();
    }
    checkUseragent(isUseragent) {
        return Boolean(this.uaMap[isUseragent]);
    }
    isStandaloneMode() {
        if (typeof window === 'undefined') {
            return false;
        }
        if ('standalone' in window.navigator) {
            return !!window.navigator.standalone;
        }
        return !!window.matchMedia('(display-mode: standalone)').matches;
    }
    initUaFlags() {
        this.isLinux = this.checkUseragent('linux');
        this.isMacOs = this.checkUseragent('mac');
        this.isSafari = this.checkUseragent('safari');
        this.isWindows = this.checkUseragent('win');
        this.isFireFox = this.checkUseragent('firefox');
        this.isMobile = this.checkUseragent('mobile');
        this.isChrome = this.checkUseragent('chrome');
        this.isIOS = this.checkUseragent('ios');
        this.isStandalone = this.isStandaloneMode();
    }
}
const getUa = (navigator) => {
    const ua = navigator.userAgent;
    const uas = ua.toLowerCase();
    const mobile = /iPhone|iPad|iPod|Android/i.test(ua);
    const android = (mobile && (uas.indexOf('android') > -1 || uas.indexOf('linux') > -1)) ||
        uas.indexOf('adr') > -1;
    const ios = mobile && !android && /Mac OS/i.test(ua);
    const mac = !mobile && /Mac OS/i.test(ua);
    const iphone = ios && uas.indexOf('iphone') > -1;
    const ipad = ios && !iphone;
    const wx = /MicroMessenger/i.test(ua);
    const chrome = /CriOS/i.test(ua) || /Chrome/i.test(ua);
    const tiktok = mobile && /aweme/i.test(ua);
    const weibo = mobile && /Weibo/i.test(ua);
    const safari = !chrome && !wx && !weibo && !tiktok && /Safari|Macintosh/i.test(ua);
    const firefox = /Firefox/.test(ua);
    const win = /windows|win32|win64|wow32|wow64/.test(uas);
    const linux = /linux/.test(uas);
    return {
        ua,
        mobile,
        android,
        ios,
        mac,
        wx,
        chrome,
        iphone,
        ipad,
        safari,
        tiktok,
        weibo,
        win,
        linux,
        firefox,
    };
};
//# sourceMappingURL=ua-helper.js.map