import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
import type { HTMLAttributes } from 'react';
export { PureWorkspaceCard } from './pure-workspace-card';
export declare const WorkspaceCard: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    workspaceMetadata: WorkspaceMetadata;
    showSyncStatus?: boolean;
    showArrowDownIcon?: boolean;
    avatarSize?: number;
    disable?: boolean;
    hideCollaborationIcon?: boolean;
    hideTeamWorkspaceIcon?: boolean;
    active?: boolean;
    infoClassName?: string;
    dense?: boolean;
    onClickOpenSettings?: (workspaceMetadata: WorkspaceMetadata) => void;
    onClickEnableCloud?: (workspaceMetadata: WorkspaceMetadata) => void;
} & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=index.d.ts.map