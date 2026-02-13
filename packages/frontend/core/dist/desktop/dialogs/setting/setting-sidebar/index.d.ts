import type { SettingTab } from '@affine/core/modules/dialogs/constant';
import { type WorkspaceMetadata } from '@affine/core/modules/workspace';
export type UserInfoProps = {
    onAccountSettingClick: () => void;
    onTabChange: (key: SettingTab, workspaceMetadata: WorkspaceMetadata | null) => void;
    active?: boolean;
};
export declare const UserInfo: ({ onAccountSettingClick, onTabChange, active, }: UserInfoProps) => import("react/jsx-runtime").JSX.Element | undefined;
export declare const SignInButton: () => import("react/jsx-runtime").JSX.Element;
export declare const SettingSidebar: ({ activeTab, onTabChange, }: {
    activeTab: SettingTab;
    onTabChange: (key: SettingTab) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map