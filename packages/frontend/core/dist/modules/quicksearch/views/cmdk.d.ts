import { type ReactNode } from 'react';
import type { QuickSearchGroup } from '../types/group';
import type { QuickSearchItem } from '../types/item';
type Groups = {
    group?: QuickSearchGroup;
    items: QuickSearchItem[];
}[];
export declare const CMDK: ({ className, query, groups: newGroups, error, inputLabel, placeholder, loading: newLoading, loadingProgress, onQueryChange, onSubmit, }: React.PropsWithChildren<{
    className?: string;
    query: string;
    error?: ReactNode;
    inputLabel?: ReactNode;
    placeholder?: string;
    loading?: boolean;
    loadingProgress?: number;
    groups?: Groups;
    onSubmit?: (item: QuickSearchItem) => void;
    onQueryChange?: (query: string) => void;
}>) => import("react/jsx-runtime").JSX.Element;
export declare const CMDKGroup: ({ group: { group, items }, onSubmit, query, }: {
    group: {
        group?: QuickSearchGroup;
        items: QuickSearchItem[];
    };
    onSubmit?: (item: QuickSearchItem) => void;
    query: string;
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=cmdk.d.ts.map