import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger, RadioGroup, } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { DefaultTheme, FontFamily, FontFamilyMap, FontStyle, FontWeightMap, TextAlign, } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger, settingWrapper } from '../style.css';
import { sortedFontWeightEntries, usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';
export const TextSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { palettes, getCurrentColor } = usePalettes(DefaultTheme.StrokeColorShortPalettes, DefaultTheme.textColor);
    const alignItems = useMemo(() => [
        {
            value: TextAlign.Left,
            label: t['com.affine.settings.editorSettings.edgeless.text.alignment.left'](),
        },
        {
            value: TextAlign.Center,
            label: t['com.affine.settings.editorSettings.edgeless.text.alignment.center'](),
        },
        {
            value: TextAlign.Right,
            label: t['com.affine.settings.editorSettings.edgeless.text.alignment.right'](),
        },
    ], [t]);
    const { textAlign } = settings['affine:edgeless-text'];
    const setTextAlign = useCallback((value) => {
        editorSetting.set('affine:edgeless-text', {
            textAlign: value,
        });
    }, [editorSetting]);
    const colorItems = useMemo(() => {
        const { color } = settings['affine:edgeless-text'];
        return palettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set('affine:edgeless-text', { color: value });
            };
            const isSelected = isEqual(color, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, palettes]);
    const fontFamilyItems = useMemo(() => {
        const { fontFamily } = settings['affine:edgeless-text'];
        return Object.entries(FontFamily).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('affine:edgeless-text', { fontFamily: value });
            };
            const isSelected = fontFamily === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const fontStyleItems = useMemo(() => {
        const { fontStyle } = settings['affine:edgeless-text'];
        return Object.entries(FontStyle).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('affine:edgeless-text', { fontStyle: value });
            };
            const isSelected = fontStyle === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const fontWeightItems = useMemo(() => {
        const { fontWeight } = settings['affine:edgeless-text'];
        return sortedFontWeightEntries.map(([name, value]) => {
            const handler = () => {
                editorSetting.set('affine:edgeless-text', { fontWeight: value });
            };
            const isSelected = fontWeight === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const currentColor = useMemo(() => {
        const { color } = settings['affine:edgeless-text'];
        return getCurrentColor(color);
    }, [getCurrentColor, settings]);
    const getElements = useCallback((doc) => {
        return doc.getBlocksByFlavour('affine:edgeless-text') || [];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.text'](), docName: "text", keyName: "affine:edgeless-text", getElements: getElements }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.color'](), desc: '', children: currentColor ? (_jsx(DropdownMenu, { items: colorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: currentColor.resolvedValue }), children: currentColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-family'](), desc: '', children: _jsx(DropdownMenu, { items: fontFamilyItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: FontFamilyMap[settings['affine:edgeless-text'].fontFamily] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-style'](), desc: '', children: _jsx(DropdownMenu, { items: fontStyleItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: String(settings['affine:edgeless-text'].fontStyle) }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-weight'](), desc: '', children: _jsx(DropdownMenu, { items: fontWeightItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: FontWeightMap[settings['affine:edgeless-text'].fontWeight] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.alignment'](), desc: '', children: _jsx(RadioGroup, { items: alignItems, value: textAlign, width: 250, className: settingWrapper, onChange: setTextAlign }) })] }));
};
//# sourceMappingURL=text.js.map