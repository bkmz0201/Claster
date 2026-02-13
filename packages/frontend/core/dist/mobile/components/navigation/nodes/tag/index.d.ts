import type { NodeOperation } from '@affine/core/desktop/components/navigation-panel';
import type { Tag } from '@affine/core/modules/tag';
export declare const NavigationPanelTagNode: ({ tagId, operations: additionalOperations, parentPath, }: {
    tagId: string;
    operations?: NodeOperation[];
    parentPath: string[];
}) => import("react/jsx-runtime").JSX.Element | null;
/**
 * the `tag.pageIds$` has a performance issue,
 * so we split the tag node children into a separate component,
 * so it won't be rendered when the tag node is collapsed.
 */
export declare const NavigationPanelTagNodeDocs: ({ tag, onNewDoc, path, }: {
    tag: Tag;
    onNewDoc?: () => void;
    path: string[];
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map