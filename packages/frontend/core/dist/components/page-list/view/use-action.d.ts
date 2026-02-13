import type { Collection } from '@affine/core/modules/collection';
import type { ReactNode } from 'react';
interface CollectionBarAction {
    icon: ReactNode;
    click: () => void;
    className?: string;
    name: string;
    tooltip: string;
}
export declare const useActions: ({ collection, openEdit, onDelete, }: {
    collection: Collection;
    openEdit: (open: Collection) => void;
    onDelete: () => void;
}) => CollectionBarAction[];
export {};
//# sourceMappingURL=use-action.d.ts.map