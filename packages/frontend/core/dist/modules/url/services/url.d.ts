import { Service } from '@toeverything/infra';
import type { ClientSchemeProvider } from '../providers/client-schema';
import type { PopupWindowProvider } from '../providers/popup-window';
export declare class UrlService extends Service {
    private readonly popupWindowProvider?;
    private readonly clientSchemeProvider?;
    constructor(popupWindowProvider?: PopupWindowProvider | undefined, clientSchemeProvider?: ClientSchemeProvider | undefined);
    getClientScheme(): string | undefined;
    /**
     * open a popup window, provide different implementations in different environments.
     * e.g. in electron, use system default browser to open a popup window.
     *
     * !IMPORTANT: browser will block popup windows in async callbacks, so you should use openExternal instead.
     *
     * @param url only full url with http/https protocol is supported
     */
    openPopupWindow(url: string): void;
    /**
     * Opens an external URL with different implementations based on the environment.
     * Unlike openPopupWindow, openExternal opens the URL in the current browser tab,
     * making it more suitable for cases where popup windows might be blocked by browsers.
     *
     * @param url only full url with http/https protocol is supported
     */
    openExternal(url: string): void;
}
//# sourceMappingURL=url.d.ts.map