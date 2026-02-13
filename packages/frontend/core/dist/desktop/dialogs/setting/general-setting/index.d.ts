import type { SettingTab } from '@affine/core/modules/dialogs/constant';
import type { SettingSidebarItem, SettingState } from '../types';
export type GeneralSettingList = SettingSidebarItem[];
export declare const useGeneralSettingList: () => GeneralSettingList;
interface GeneralSettingProps {
    activeTab: SettingTab;
    onChangeSettingState: (settingState: SettingState) => void;
}
export declare const GeneralSetting: ({ activeTab, onChangeSettingState, }: GeneralSettingProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map