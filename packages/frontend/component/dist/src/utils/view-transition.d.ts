/**
 * A wrapper around `document.startViewTransition` that adds a scope attribute to the body element.
 */
export declare function startScopedViewTransition(scope: string | string[], cb: () => Promise<void> | void, options?: {
    timeout?: number;
}): void;
export declare function vtScopeSelector(scope: string): string;
//# sourceMappingURL=view-transition.d.ts.map