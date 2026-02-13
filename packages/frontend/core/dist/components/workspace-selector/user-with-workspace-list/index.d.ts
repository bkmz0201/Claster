import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
export declare const SignInItem: () => import("react/jsx-runtime").JSX.Element;
interface UserWithWorkspaceListProps {
    onEventEnd?: () => void;
    onClickWorkspace?: (workspace: WorkspaceMetadata) => void;
    onCreatedWorkspace?: (payload: {
        metadata: WorkspaceMetadata;
        defaultDocId?: string;
    }) => void;
    showEnableCloudButton?: boolean;
}
export declare const UserWithWorkspaceList: ({ onEventEnd, onClickWorkspace, onCreatedWorkspace, showEnableCloudButton, }: UserWithWorkspaceListProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map