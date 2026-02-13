import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';
export const Preferences = () => {
    const t = useI18n();
    return (_jsxs(SettingWrapper, { title: t['com.affine.settings.editorSettings.preferences'](), children: [_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.preferences.export.title'](), desc: t['com.affine.settings.editorSettings.preferences.export.description'](), children: _jsx(Button, { children: "Export" }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.preferences.import.title'](), desc: t['com.affine.settings.editorSettings.preferences.import.description'](), children: _jsx(Button, { children: "Import" }) })] }));
};
//# sourceMappingURL=preferences.js.map