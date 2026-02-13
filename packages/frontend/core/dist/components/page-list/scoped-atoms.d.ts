import { createIsolation } from 'jotai-scope';
import type { ListItem, ListProps, MetaRecord, VirtualizedListProps } from './types';
export declare const listPropsAtom: import("jotai").PrimitiveAtom<(ListProps<ListItem> & Partial<VirtualizedListProps<ListItem>>) | undefined> & {
    init: (ListProps<ListItem> & Partial<VirtualizedListProps<ListItem>>) | undefined;
};
export declare const anchorIndexAtom: import("jotai").PrimitiveAtom<number | undefined> & {
    init: number | undefined;
};
export declare const rangeIdsAtom: import("jotai").PrimitiveAtom<string[]> & {
    init: string[];
};
export declare const selectionStateAtom: import("jotai").WritableAtom<{
    selectionActive: boolean | undefined;
    selectable: boolean | "toggle" | undefined;
    selectedIds: string[] | undefined;
    onSelectedIdsChange: ((selected: string[]) => void) | undefined;
}, [active: boolean], void>;
export declare const groupCollapseStateAtom: import("jotai").PrimitiveAtom<Record<string, boolean>> & {
    init: Record<string, boolean>;
};
export declare const listHandlersAtom: import("jotai").Atom<{
    onSelectedIdsChange: ((selected: string[]) => void) | undefined;
}>;
export declare const itemsAtom: import("jotai").Atom<ListItem[] | undefined>;
export declare const showOperationsAtom: import("jotai").Atom<boolean>;
export declare const sorterAtom: import("jotai").WritableAtom<{
    key?: "id" | "createDate" | "updatedDate" | undefined;
    order?: "desc" | "asc" | undefined;
    fallbackKey?: "id" | "createDate" | "updatedDate" | undefined;
    items: ListItem[] | undefined;
}, [{
    newSortKey: keyof MetaRecord<ListItem>;
}], void>;
export declare const groupsAtom: import("jotai").Atom<import("./types").ItemGroupProps<ListItem>[]>;
declare const useAtom: typeof import("jotai").useAtom, useAtomValue: typeof import("jotai").useAtomValue, useSetAtom: typeof import("jotai").useSetAtom;
export declare const ListProvider: ReturnType<typeof createIsolation>['Provider'];
export { useAtom, useAtomValue, useSetAtom };
//# sourceMappingURL=scoped-atoms.d.ts.map