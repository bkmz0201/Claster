export declare function useDisposable<T extends Disposable | AsyncDisposable>(disposableFn: (abortSignal?: AbortSignal) => Promise<T | null>, deps?: any[]): {
    data: T | null;
    loading: boolean;
    error: Error | null;
};
export declare function useDisposable<T extends Disposable | AsyncDisposable>(disposableFn: (abortSignal?: AbortSignal) => T | null, deps?: any[]): {
    data: T | null;
};
//# sourceMappingURL=use-disposable.d.ts.map