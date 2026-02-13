import type { View } from '../../entities/view';
export declare const draggingOverViewAtom: import("jotai").PrimitiveAtom<{
    view: View;
    index: number;
    edge: "left" | "right";
} | null> & {
    init: {
        view: View;
        index: number;
        edge: "left" | "right";
    } | null;
};
export declare const draggingViewAtom: import("jotai").PrimitiveAtom<{
    view: View;
    index: number;
} | null> & {
    init: {
        view: View;
        index: number;
    } | null;
};
export declare const resizingViewAtom: import("jotai").PrimitiveAtom<{
    view: View;
    index: number;
} | null> & {
    init: {
        view: View;
        index: number;
    } | null;
};
export declare const draggingOverResizeHandleAtom: import("jotai").PrimitiveAtom<{
    viewId: string;
    edge: "left" | "right";
} | null> & {
    init: {
        viewId: string;
        edge: "left" | "right";
    } | null;
};
//# sourceMappingURL=state.d.ts.map