import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
export declare const AFFiNEWorkspaceList: ({ onEventEnd, onClickWorkspace, showEnableCloudButton, }: {
    onClickWorkspace?: (workspaceMetadata: WorkspaceMetadata) => void;
    onEventEnd?: () => void;
    showEnableCloudButton?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
interface WorkspaceListProps {
    items: WorkspaceMetadata[];
    onClick: (workspace: WorkspaceMetadata) => void;
    onSettingClick?: (workspace: WorkspaceMetadata) => void;
    onEnableCloudClick?: (meta: WorkspaceMetadata) => void;
}
export declare const WorkspaceList: (props: WorkspaceListProps) => import("react/jsx-runtime").JSX.Element[];
export {};
//# sourceMappingURL=index.d.ts.map