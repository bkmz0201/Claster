import type { Tag } from '@affine/core/modules/tag';
import type { GenericNavigationPanelNode } from '../types';
export declare const NavigationPanelTagNode: ({ tagId, onDrop, location, reorderable, operations: additionalOperations, dropEffect, canDrop, parentPath, }: {
    tagId: string;
} & GenericNavigationPanelNode) => import("react/jsx-runtime").JSX.Element | null;
/**
 * the `tag.pageIds$` has a performance issue,
 * so we split the tag node children into a separate component,
 * so it won't be rendered when the tag node is collapsed.
 */
export declare const NavigationPanelTagNodeDocs: ({ tag, path, }: {
    tag: Tag;
    path: string[];
}) => import("react/jsx-runtime").JSX.Element[];
//# sourceMappingURL=index.d.ts.map