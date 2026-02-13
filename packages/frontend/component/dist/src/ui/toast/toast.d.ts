export declare const sleep: (ms?: number) => Promise<unknown>;
export type ToastOptions = {
    duration?: number;
    portal?: HTMLElement;
};
/**
 * @example
 * ```ts
 * toast('Hello World');
 * ```
 */
export declare const toast: (message: string, { duration, portal }?: ToastOptions) => void;
export default toast;
//# sourceMappingURL=toast.d.ts.map