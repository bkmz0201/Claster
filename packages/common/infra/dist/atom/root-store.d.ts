export declare function getCurrentStore(): {
    get: <Value>(atom: import("jotai").Atom<Value>) => Value;
    set: <Value, Args extends unknown[], Result>(atom: import("jotai").WritableAtom<Value, Args, Result>, ...args: Args) => Result;
    sub: (atom: import("jotai").Atom<unknown>, listener: () => void) => () => void;
} | ({
    get: <Value>(atom: import("jotai").Atom<Value>) => Value;
    set: <Value, Args extends unknown[], Result>(atom: import("jotai").WritableAtom<Value, Args, Result>, ...args: Args) => Result;
    sub: (atom: import("jotai").Atom<unknown>, listener: () => void) => () => void;
} & import("jotai/vanilla/store").INTERNAL_DevStoreRev4);
//# sourceMappingURL=root-store.d.ts.map