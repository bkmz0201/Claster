import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { SettingGroup } from '../group';
import { FontStyleSetting } from './font';
import { LanguageSetting } from './language';
import { ThemeSetting } from './theme';
export const AppearanceGroup = () => {
    const t = useI18n();
    return (_jsxs(SettingGroup, { title: t['com.affine.mobile.setting.appearance.title'](), children: [_jsx(ThemeSetting, {}), _jsx(FontStyleSetting, {}), _jsx(LanguageSetting, {})] }));
};
//# sourceMappingURL=index.js.map