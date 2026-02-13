type OnClose = (() => void) | undefined;
export interface ModalConfig {
    /**
     * add global callback for modal open,
     * return a function to handle close/unmount callback
     */
    onOpen?: () => OnClose;
    /**
     * For mobile
     */
    dynamicKeyboardHeight?: string | number;
}
export declare const ModalConfigContext: import("react").Context<ModalConfig>;
export declare const InsideModalContext: import("react").Context<number>;
export {};
//# sourceMappingURL=context.d.ts.map