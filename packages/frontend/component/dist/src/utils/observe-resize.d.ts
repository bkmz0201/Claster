import type { ResizeObserverEntry } from '@juggle/resize-observer';
type ObserveResize = {
    callback: (entity: ResizeObserverEntry) => void;
    dispose: () => void;
};
/**
 * A function to observe the resize of an element use global ResizeObserver.
 *
 * ```ts
 * useEffect(() => {
 *  const dispose1 = observeResize(elRef1.current, (entry) => {});
 *  const dispose2 = observeResize(elRef2.current, (entry) => {});
 *
 *  return () => {
 *   dispose1();
 *   dispose2();
 *  };
 * }, [])
 * ```
 * @return A function to dispose the observer.
 */
export declare const observeResize: (element: Element, callback: ObserveResize["callback"]) => () => void;
export {};
//# sourceMappingURL=observe-resize.d.ts.map