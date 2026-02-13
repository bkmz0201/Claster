import { jsx as _jsx } from "react/jsx-runtime";
import { getThemeOptions } from '@affine/core/desktop/dialogs/setting/general-setting/appearance';
import { useI18n } from '@affine/i18n';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { SettingDropdownSelect } from '../dropdown-select';
import { RowLayout } from '../row.layout';
export const ThemeSetting = () => {
    const t = useI18n();
    const options = useMemo(() => getThemeOptions(t), [t]);
    const { setTheme, theme } = useTheme();
    return (_jsx(RowLayout, { label: t['com.affine.mobile.setting.appearance.theme'](), children: _jsx(SettingDropdownSelect, { options: options, value: theme, onChange: setTheme }) }));
};
//# sourceMappingURL=theme.js.map