import type { NodeOperation } from '@affine/core/desktop/components/navigation-panel';
import { type FolderNode } from '@affine/core/modules/organize';
export declare const NavigationPanelFolderNode: ({ nodeId, operations, parentPath, }: {
    nodeId: string;
    operations?: NodeOperation[] | ((type: string, node: FolderNode) => NodeOperation[]);
    parentPath: string[];
}) => import("react/jsx-runtime").JSX.Element | null | undefined;
//# sourceMappingURL=index.d.ts.map