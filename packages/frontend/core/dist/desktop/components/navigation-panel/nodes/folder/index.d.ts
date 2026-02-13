import { type DropTargetDropEvent } from '@affine/component';
import { type FolderNode } from '@affine/core/modules/organize';
import type { AffineDNDData } from '@affine/core/types/dnd';
import type { NodeOperation } from '../../tree/types';
import type { GenericNavigationPanelNode } from '../types';
export declare const NavigationPanelFolderNode: ({ nodeId, onDrop, defaultRenaming, operations, location, dropEffect, canDrop, reorderable, parentPath, }: {
    defaultRenaming?: boolean;
    nodeId: string;
    onDrop?: (data: DropTargetDropEvent<AffineDNDData>, node: FolderNode) => void;
    operations?: NodeOperation[] | ((type: string, node: FolderNode) => NodeOperation[]);
} & Omit<GenericNavigationPanelNode, "operations">) => "" | import("react/jsx-runtime").JSX.Element | undefined;
//# sourceMappingURL=index.d.ts.map