import type { SettingTab } from '@affine/core/modules/dialogs/constant';
import type { SettingSidebarItem, SettingState } from '../types';
export declare const WorkspaceSetting: ({ activeTab, onCloseSetting, onChangeSettingState, }: {
    activeTab: SettingTab;
    onCloseSetting: () => void;
    onChangeSettingState: (settingState: SettingState) => void;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const useWorkspaceSettingList: () => SettingSidebarItem[];
//# sourceMappingURL=index.d.ts.map