import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';
export const AboutGroup = () => {
    const t = useI18n();
    return (_jsxs(SettingGroup, { title: t['com.affine.mobile.setting.about.title'](), children: [_jsx(RowLayout, { label: t['com.affine.mobile.setting.about.appVersion'](), children: BUILD_CONFIG.isIOS
                    ? hiddenVersionVariant(BUILD_CONFIG.appVersion)
                    : BUILD_CONFIG.appVersion }), _jsx(RowLayout, { label: t['com.affine.mobile.setting.about.editorVersion'](), children: BUILD_CONFIG.isIOS
                    ? hiddenVersionVariant(BUILD_CONFIG.editorVersion)
                    : BUILD_CONFIG.editorVersion })] }));
};
// 0.23.0-beta.1 -> 0.23.0
function hiddenVersionVariant(version) {
    return version.replace(/(\d+\.\d+\.\d+)(.*)/, '$1');
}
//# sourceMappingURL=index.js.map