import type { ConfirmModalProps } from '@affine/component/ui/modal';
import type { WorkspaceMetadata } from '@affine/core/modules/workspace';
interface WorkspaceDeleteProps extends ConfirmModalProps {
    workspaceMetadata: WorkspaceMetadata;
    onConfirm?: () => void;
}
export declare const WorkspaceDeleteModal: ({ workspaceMetadata, ...props }: WorkspaceDeleteProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map