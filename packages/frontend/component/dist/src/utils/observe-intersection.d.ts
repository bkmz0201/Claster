type ObserveIntersection = {
    callback: (entity: IntersectionObserverEntry) => void;
    dispose: () => void;
};
/**
 * A function to observe the intersection of an element use global IntersectionObserver.
 *
 * ```ts
 * useEffect(() => {
 *  const dispose1 = observeIntersection(elRef1.current, (entry) => {});
 *  const dispose2 = observeIntersection(elRef2.current, (entry) => {});
 *
 *  return () => {
 *   dispose1();
 *   dispose2();
 *  };
 * }, [])
 * ```
 * @return A function to dispose the observer.
 */
export declare const observeIntersection: (element: Element, callback: ObserveIntersection["callback"]) => () => void;
export {};
//# sourceMappingURL=observe-intersection.d.ts.map