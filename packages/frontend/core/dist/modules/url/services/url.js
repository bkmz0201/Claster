import { Service } from '@toeverything/infra';
export class UrlService extends Service {
    constructor(
    // those providers are optional, because they are not always available in some environments
    popupWindowProvider, clientSchemeProvider) {
        super();
        this.popupWindowProvider = popupWindowProvider;
        this.clientSchemeProvider = clientSchemeProvider;
    }
    getClientScheme() {
        return this.clientSchemeProvider?.getClientScheme();
    }
    /**
     * open a popup window, provide different implementations in different environments.
     * e.g. in electron, use system default browser to open a popup window.
     *
     * !IMPORTANT: browser will block popup windows in async callbacks, so you should use openExternal instead.
     *
     * @param url only full url with http/https protocol is supported
     */
    openPopupWindow(url) {
        if (!url.startsWith('http')) {
            throw new Error('only full url with http/https protocol is supported');
        }
        this.popupWindowProvider?.open(url);
    }
    /**
     * Opens an external URL with different implementations based on the environment.
     * Unlike openPopupWindow, openExternal opens the URL in the current browser tab,
     * making it more suitable for cases where popup windows might be blocked by browsers.
     *
     * @param url only full url with http/https protocol is supported
     */
    openExternal(url) {
        let parsed;
        try {
            parsed = new URL(url);
        }
        catch {
            throw new Error(`Invalid external URL: ${url}`);
        }
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            throw new Error('only http/https URLs are supported');
        }
        if (BUILD_CONFIG.isWeb || BUILD_CONFIG.isMobileWeb) {
            location.href = url;
        }
        else {
            this.popupWindowProvider?.open(url);
        }
    }
}
//# sourceMappingURL=url.js.map