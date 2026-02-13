import { type DropTargetDropEvent, type DropTargetOptions, type DropTargetTreeInstruction } from '@affine/component';
import type { ExplorerType } from '@affine/core/modules/explorer-icon/store/explorer-icon';
import type { DocPermissionActions } from '@affine/core/modules/permissions';
import type { AffineDNDData } from '@affine/core/types/dnd';
import type { To } from 'history';
import { type RefAttributes } from 'react';
import type { NodeOperation } from './types';
export type NavigationPanelTreeNodeDropEffectData = {
    source: {
        data: AffineDNDData['draggable'];
    };
    treeInstruction: DropTargetTreeInstruction | null;
};
export type NavigationPanelTreeNodeDropEffect = (data: NavigationPanelTreeNodeDropEffectData) => 'copy' | 'move' | 'link' | undefined;
export type NavigationPanelTreeNodeIcon = React.ComponentType<{
    className?: string;
    draggedOver?: boolean;
    treeInstruction?: DropTargetTreeInstruction | null;
    collapsed?: boolean;
}>;
export interface BaseNavigationPanelTreeNodeProps {
    name?: string;
    icon?: NavigationPanelTreeNodeIcon;
    children?: React.ReactNode;
    active?: boolean;
    extractEmojiAsIcon?: boolean;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    collapsible?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    to?: To;
    postfix?: React.ReactNode;
    operations?: NodeOperation[];
    childrenOperations?: NodeOperation[];
    childrenPlaceholder?: React.ReactNode;
    linkComponent?: React.ComponentType<React.PropsWithChildren<{
        to: To;
        className?: string;
    }> & RefAttributes<any> & {
        draggable?: boolean;
    }>;
    [key: `data-${string}`]: any;
}
type ExplorerIconConfig = {
    where: ExplorerType;
    id: string;
};
interface WebNavigationPanelTreeNodeProps extends BaseNavigationPanelTreeNodeProps {
    renameable?: boolean;
    onRename?: (newName: string) => void;
    renameableGuard?: {
        docId: string;
        action: DocPermissionActions;
    };
    defaultRenaming?: boolean;
    explorerIconConfig?: ExplorerIconConfig | null;
    canDrop?: DropTargetOptions<AffineDNDData>['canDrop'];
    reorderable?: boolean;
    dndData?: AffineDNDData;
    onDrop?: (data: DropTargetDropEvent<AffineDNDData>) => void;
    dropEffect?: NavigationPanelTreeNodeDropEffect;
}
/**
 * specific rename modal for navigation panel tree node,
 * Separate it into a separate component to prevent re-rendering the entire component when width changes.
 */
export declare const NavigationPanelTreeNodeRenameModal: ({ setRenaming, handleRename, rawName, explorerIconConfig, className, fallbackIcon, }: {
    setRenaming: (renaming: boolean) => void;
    handleRename: (newName: string) => void;
    rawName: string | undefined;
    className?: string;
    explorerIconConfig?: ExplorerIconConfig | null;
    fallbackIcon?: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const NavigationPanelTreeNode: ({ children, icon: Icon, name: rawName, onClick, to, active, defaultRenaming, renameable, renameableGuard, onRename, disabled, collapsed, setCollapsed, collapsible, canDrop, reorderable, operations, postfix, childrenOperations, childrenPlaceholder, linkComponent: LinkComponent, dndData, explorerIconConfig, onDrop, dropEffect, ...otherProps }: WebNavigationPanelTreeNodeProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=node.d.ts.map