import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RadioGroup, Switch } from '@affine/component';
import { SettingHeader, SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { LanguageMenu } from '@affine/core/components/affine/language-menu';
import { TraySettingService } from '@affine/core/modules/editor-setting/services/tray-settings';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';
import { useAppSettingHelper } from '../../../../../components/hooks/affine/use-app-setting-helper';
import { OpenInAppLinksMenu } from './links';
import { settingWrapper } from './style.css';
import { ThemeEditorSetting } from './theme-editor-setting';
export const getThemeOptions = (t) => [
    {
        value: 'system',
        label: t['com.affine.themeSettings.system'](),
        testId: 'system-theme-trigger',
    },
    {
        value: 'light',
        label: t['com.affine.themeSettings.light'](),
        testId: 'light-theme-trigger',
    },
    {
        value: 'dark',
        label: t['com.affine.themeSettings.dark'](),
        testId: 'dark-theme-trigger',
    },
];
export const ThemeSettings = () => {
    const t = useI18n();
    const { setTheme, theme } = useTheme();
    const radioItems = useMemo(() => getThemeOptions(t), [t]);
    return (_jsx(RadioGroup, { items: radioItems, value: theme, width: 250, className: settingWrapper, onChange: useCallback((value) => {
            setTheme(value);
        }, [setTheme]) }));
};
const MenubarSetting = () => {
    const t = useI18n();
    const traySettingService = useService(TraySettingService);
    const traySetting = useLiveData(traySettingService.settings$);
    return (_jsxs(_Fragment, { children: [_jsx(SettingWrapper, { id: "menubar", title: t['com.affine.appearanceSettings.menubar.title'](), children: _jsx(SettingRow, { name: t['com.affine.appearanceSettings.menubar.toggle'](), desc: t['com.affine.appearanceSettings.menubar.description'](), children: _jsx(Switch, { checked: traySetting.enabled, onChange: checked => traySettingService.setEnabled(checked) }) }) }), traySetting.enabled && !environment.isMacOs ? (_jsxs(SettingWrapper, { id: "windowBehavior", title: t['com.affine.appearanceSettings.menubar.windowBehavior.title'](), children: [_jsx(SettingRow, { name: t['com.affine.appearanceSettings.menubar.windowBehavior.openOnLeftClick.toggle'](), desc: t['com.affine.appearanceSettings.menubar.windowBehavior.openOnLeftClick.description'](), children: _jsx(Switch, { checked: traySetting.openOnLeftClick, onChange: checked => traySettingService.setOpenOnLeftClick(checked) }) }), _jsx(SettingRow, { name: t['com.affine.appearanceSettings.menubar.windowBehavior.minimizeToTray.toggle'](), desc: t['com.affine.appearanceSettings.menubar.windowBehavior.minimizeToTray.description'](), children: _jsx(Switch, { checked: traySetting.minimizeToTray, onChange: checked => traySettingService.setMinimizeToTray(checked) }) }), _jsx(SettingRow, { name: t['com.affine.appearanceSettings.menubar.windowBehavior.closeToTray.toggle'](), desc: t['com.affine.appearanceSettings.menubar.windowBehavior.closeToTray.description'](), children: _jsx(Switch, { checked: traySetting.closeToTray, onChange: checked => traySettingService.setCloseToTray(checked) }) }), _jsx(SettingRow, { name: t['com.affine.appearanceSettings.menubar.windowBehavior.startMinimized.toggle'](), desc: t['com.affine.appearanceSettings.menubar.windowBehavior.startMinimized.description'](), children: _jsx(Switch, { checked: traySetting.startMinimized, onChange: checked => traySettingService.setStartMinimized(checked) }) })] })) : null] }));
};
export const AppearanceSettings = () => {
    const t = useI18n();
    const featureFlagService = useService(FeatureFlagService);
    const enableThemeEditor = useLiveData(featureFlagService.flags.enable_theme_editor.$);
    const { appSettings, updateSettings } = useAppSettingHelper();
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.appearanceSettings.title'](), subtitle: t['com.affine.appearanceSettings.subtitle']() }), _jsxs(SettingWrapper, { title: t['com.affine.appearanceSettings.theme.title'](), children: [_jsx(SettingRow, { name: t['com.affine.appearanceSettings.color.title'](), desc: t['com.affine.appearanceSettings.color.description'](), children: _jsx(ThemeSettings, {}) }), _jsx(SettingRow, { name: t['com.affine.appearanceSettings.language.title'](), desc: t['com.affine.appearanceSettings.language.description'](), children: _jsx("div", { className: settingWrapper, children: _jsx(LanguageMenu, {}) }) }), BUILD_CONFIG.isElectron ? (_jsx(SettingRow, { name: t['com.affine.appearanceSettings.clientBorder.title'](), desc: t['com.affine.appearanceSettings.clientBorder.description'](), "data-testid": "client-border-style-trigger", children: _jsx(Switch, { checked: appSettings.clientBorder, onChange: checked => updateSettings('clientBorder', checked) }) })) : null, enableThemeEditor ? _jsx(ThemeEditorSetting, {}) : null] }), BUILD_CONFIG.isWeb && !environment.isMobile ? (_jsx(SettingWrapper, { title: t['com.affine.setting.appearance.links'](), children: _jsx(SettingRow, { name: t['com.affine.setting.appearance.open-in-app'](), desc: t['com.affine.setting.appearance.open-in-app.hint'](), "data-testid": "open-in-app-links-trigger", children: _jsx(OpenInAppLinksMenu, {}) }) })) : null, _jsxs(SettingWrapper, { title: t['com.affine.appearanceSettings.sidebar.title'](), children: [BUILD_CONFIG.isElectron ? (_jsx(SettingRow, { name: t['com.affine.appearanceSettings.noisyBackground.title'](), desc: t['com.affine.appearanceSettings.noisyBackground.description'](), children: _jsx(Switch, { checked: appSettings.enableNoisyBackground, onChange: checked => updateSettings('enableNoisyBackground', checked) }) })) : null, BUILD_CONFIG.isElectron && environment.isMacOs && (_jsx(SettingRow, { name: t['com.affine.appearanceSettings.translucentUI.title'](), desc: t['com.affine.appearanceSettings.translucentUI.description'](), children: _jsx(Switch, { checked: appSettings.enableBlurBackground, onChange: checked => updateSettings('enableBlurBackground', checked) }) })), _jsx(SettingRow, { name: t['com.affine.appearanceSettings.showLinkedDocInSidebar.title'](), desc: t['com.affine.appearanceSettings.showLinkedDocInSidebar.description'](), children: _jsx(Switch, { checked: !!appSettings.showLinkedDocInSidebar, onChange: checked => updateSettings('showLinkedDocInSidebar', checked) }) })] }), BUILD_CONFIG.isElectron ? _jsx(MenubarSetting, {}) : null] }));
};
//# sourceMappingURL=index.js.map