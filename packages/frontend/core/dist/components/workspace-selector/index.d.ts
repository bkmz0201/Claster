import { type MenuProps } from '@affine/component';
import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
interface WorkspaceSelectorProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    workspaceMetadata?: WorkspaceMetadata;
    onSelectWorkspace?: (workspaceMetadata: WorkspaceMetadata) => void;
    onCreatedWorkspace?: (payload: {
        metadata: WorkspaceMetadata;
        defaultDocId?: string;
    }) => void;
    showEnableCloudButton?: boolean;
    showArrowDownIcon?: boolean;
    showSyncStatus?: boolean;
    disable?: boolean;
    menuContentOptions?: MenuProps['contentOptions'];
    className?: string;
    /** if true, will hide cloud/local, and scale the avatar */
    dense?: boolean;
}
export declare const WorkspaceSelector: ({ workspaceMetadata: outerWorkspaceMetadata, onSelectWorkspace, onCreatedWorkspace, showArrowDownIcon, disable, open: outerOpen, onOpenChange: outerOnOpenChange, showEnableCloudButton, showSyncStatus, className, menuContentOptions, dense, }: WorkspaceSelectorProps) => import("react/jsx-runtime").JSX.Element;
export declare const WorkspaceNavigator: ({ onSelectWorkspace, onCreatedWorkspace, ...props }: WorkspaceSelectorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map