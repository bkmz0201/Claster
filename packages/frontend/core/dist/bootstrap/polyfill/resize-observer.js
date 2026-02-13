import { ResizeObserver } from '@juggle/resize-observer';
(function polyfillResizeObserver() {
    if (typeof window !== 'undefined') {
        window.ResizeObserver = ResizeObserver;
    }
})();
//# sourceMappingURL=resize-observer.js.map