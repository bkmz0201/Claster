import type { ToastOptions } from '@affine/component';
export declare const toast: (message: string, options?: ToastOptions) => void;
declare global {
    interface WindowEventMap {
        'affine-toast:emit': CustomEvent<{
            message: string;
        }>;
    }
}
//# sourceMappingURL=toast.d.ts.map