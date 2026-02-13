export interface PopupWindowProvider {
    /**
     * open a popup window, provide different implementations in different environments.
     * e.g. in electron, use system default browser to open a popup window.
     */
    open(url: string): void;
}
export declare const PopupWindowProvider: import("@toeverything/infra").Identifier<PopupWindowProvider> & ((variant: string) => import("@toeverything/infra").Identifier<PopupWindowProvider>);
//# sourceMappingURL=popup-window.d.ts.map