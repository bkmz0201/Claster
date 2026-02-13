import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
interface WorkspaceListProps {
    items: WorkspaceMetadata[];
    onClick: (workspace: WorkspaceMetadata) => void;
    onSettingClick?: (workspace: WorkspaceMetadata) => void;
    onEnableCloudClick?: (meta: WorkspaceMetadata) => void;
}
export declare const WorkspaceList: (props: WorkspaceListProps) => import("react/jsx-runtime").JSX.Element[];
export declare const SelectorMenu: ({ onClose }: {
    onClose?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=menu.d.ts.map