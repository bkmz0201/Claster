import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, MenuItem, MenuTrigger, Switch } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { menuTrigger } from '../style.css';
const getThemeOptions = (t) => [
    {
        value: 'specified',
        label: t['com.affine.settings.editorSettings.page.edgeless-default-theme.specified'](),
    },
    {
        value: 'dark',
        label: t['com.affine.themeSettings.dark'](),
    },
    {
        value: 'light',
        label: t['com.affine.themeSettings.light'](),
    },
    {
        value: 'auto',
        label: t['com.affine.themeSettings.auto'](),
    },
];
const getThemeValue = (theme, t) => {
    switch (theme) {
        case 'dark':
            return t['com.affine.themeSettings.dark']();
        case 'light':
            return t['com.affine.themeSettings.light']();
        case 'auto':
            return t['com.affine.themeSettings.auto']();
        case 'specified':
            return t['com.affine.settings.editorSettings.page.edgeless-default-theme.specified']();
        default:
            return '';
    }
};
export const GeneralEdgelessSetting = () => {
    const t = useI18n();
    const editorSetting = useService(EditorSettingService).editorSetting;
    const edgelessDefaultTheme = useLiveData(editorSetting.settings$).edgelessDefaultTheme;
    const items = getThemeOptions(t);
    const currentTheme = useMemo(() => {
        return getThemeValue(edgelessDefaultTheme, t);
    }, [edgelessDefaultTheme, t]);
    const menuItems = useMemo(() => {
        return items.map(item => {
            const selected = edgelessDefaultTheme === item.value;
            const onSelect = () => {
                editorSetting.set('edgelessDefaultTheme', item.value);
            };
            return (_jsx(MenuItem, { selected: selected, onSelect: onSelect, children: item.label }, item.value));
        });
    }, [editorSetting, items, edgelessDefaultTheme]);
    const handleScrollZoomChange = useCallback((checked) => {
        editorSetting.set('edgelessScrollZoom', checked);
    }, [editorSetting]);
    return (_jsxs(_Fragment, { children: [_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.page.edgeless-default-theme.title'](), desc: t['com.affine.settings.editorSettings.page.edgeless-default-theme.description'](), children: _jsx(Menu, { items: menuItems, contentOptions: {
                        align: 'end',
                        sideOffset: 16,
                        style: {
                            width: '280px',
                        },
                    }, children: _jsx(MenuTrigger, { tooltip: currentTheme, className: menuTrigger, children: currentTheme }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.page.edgeless-scroll-wheel-zoom.title'](), desc: t['com.affine.settings.editorSettings.page.edgeless-scroll-wheel-zoom.description'](), children: _jsx(Switch, { checked: editorSetting.edgelessScrollZoom.$.value, onChange: handleScrollZoomChange }) })] }));
};
//# sourceMappingURL=general.js.map