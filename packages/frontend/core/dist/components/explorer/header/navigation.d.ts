declare const items: readonly [{
    readonly value: "docs";
    readonly label: "com.affine.docs.header";
    readonly testId: "workspace-docs-button";
    readonly to: "/all";
}, {
    readonly value: "collections";
    readonly label: "com.affine.collections.header";
    readonly testId: "workspace-collections-button";
    readonly to: "/collection";
}, {
    readonly value: "tags";
    readonly label: "Tags";
    readonly testId: "workspace-tags-button";
    readonly to: "/tag";
}];
type NavigationKey = (typeof items)[number]['value'];
export declare const ExplorerNavigation: ({ active }: {
    active: NavigationKey;
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=navigation.d.ts.map