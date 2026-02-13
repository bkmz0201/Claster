export type GlobalLoadingEvent = {
    key?: string;
};
export declare const globalLoadingEventsAtom: import("jotai").Atom<GlobalLoadingEvent[]>;
export declare const resolveGlobalLoadingEventAtom: import("jotai").WritableAtom<null, [key: string], void> & {
    init: null;
};
export declare const pushGlobalLoadingEventAtom: import("jotai").WritableAtom<null, [GlobalLoadingEvent], void> & {
    init: null;
};
//# sourceMappingURL=index.jotai.d.ts.map