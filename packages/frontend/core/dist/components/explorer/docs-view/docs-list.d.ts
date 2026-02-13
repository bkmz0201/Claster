export declare const DocListItemComponent: import("react").NamedExoticComponent<{
    groupId: string;
    itemId: string;
}>;
export declare const DocsExplorer: ({ className, disableMultiSelectToolbar, disableMultiDelete, masonryItemWidthMin, onRestore, onDelete, }: {
    className?: string;
    disableMultiSelectToolbar?: boolean;
    disableMultiDelete?: boolean;
    masonryItemWidthMin?: number;
    onRestore?: (ids: string[]) => void;
    /** Override the default delete action */
    onDelete?: (ids: string[], callbacks?: {
        onFinished?: () => void;
        onAbort?: () => void;
        onError?: (error: Error) => void;
    }) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=docs-list.d.ts.map