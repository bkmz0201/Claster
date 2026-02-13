import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading, Menu, MenuItem, MenuSeparator, MenuTrigger, RadioGroup, RowInput, Scrollable, Slider, Switch, useConfirmModal, } from '@affine/component';
import { SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { ServerService } from '@affine/core/modules/cloud';
import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { EditorSettingService, fontStyleOptions, } from '@affine/core/modules/editor-setting';
import { SpellCheckSettingService } from '@affine/core/modules/editor-setting/services/spell-check-setting';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { SystemFontFamilyService, } from '@affine/core/modules/system-font-family';
import { Trans, useI18n } from '@affine/i18n';
import { DoneIcon, SearchIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useMemo, useState, } from 'react';
import { Virtuoso } from 'react-virtuoso';
import * as styles from './style.css';
const getLabel = (fontKey, t) => {
    switch (fontKey) {
        case 'Sans':
            return t['com.affine.appearanceSettings.fontStyle.sans']();
        case 'Serif':
            return t['com.affine.appearanceSettings.fontStyle.serif']();
        case 'Mono':
            return t[`com.affine.appearanceSettings.fontStyle.mono`]();
        case 'Custom':
            return t['com.affine.settings.editorSettings.edgeless.custom']();
        default:
            return '';
    }
};
export const getBaseFontStyleOptions = (t) => {
    return fontStyleOptions
        .map(({ key, value }) => {
        if (key === 'Custom') {
            return null;
        }
        const label = getLabel(key, t);
        return {
            value: key,
            label,
            testId: 'system-font-style-trigger',
            style: {
                fontFamily: value,
            },
        };
    })
        .filter(item => item !== null);
};
const FontFamilySettings = () => {
    const t = useI18n();
    const { editorSettingService } = useServices({ EditorSettingService });
    const settings = useLiveData(editorSettingService.editorSetting.settings$);
    const radioItems = useMemo(() => {
        const items = getBaseFontStyleOptions(t);
        if (!BUILD_CONFIG.isElectron)
            return items;
        // resolve custom fonts
        const customOption = fontStyleOptions.find(opt => opt.key === 'Custom');
        if (customOption) {
            const fontFamily = settings.customFontFamily
                ? `${settings.customFontFamily}, ${customOption.value}`
                : customOption.value;
            items.push({
                value: customOption.key,
                label: getLabel(customOption.key, t),
                testId: 'system-font-style-trigger',
                style: { fontFamily },
            });
        }
        return items;
    }, [settings.customFontFamily, t]);
    const handleFontFamilyChange = useCallback((value) => {
        editorSettingService.editorSetting.set('fontFamily', value);
    }, [editorSettingService.editorSetting]);
    return (_jsx(SettingRow, { name: t['com.affine.appearanceSettings.font.title'](), desc: t['com.affine.appearanceSettings.font.description'](), children: _jsx(RadioGroup, { items: radioItems, value: settings.fontFamily, width: 250, className: styles.settingWrapper, onChange: handleFontFamilyChange }) }));
};
const getFontFamily = (font) => `${font}, ${fontStyleOptions[0].value}`;
const Scroller = forwardRef(({ children, ...props }, ref) => {
    return (_jsxs(Scrollable.Root, { children: [_jsx(Scrollable.Viewport, { ...props, ref: ref, children: children }), _jsx(Scrollable.Scrollbar, {})] }));
});
Scroller.displayName = 'Scroller';
const FontMenuItems = ({ onSelect }) => {
    const { systemFontFamilyService, editorSettingService } = useServices({
        SystemFontFamilyService,
        EditorSettingService,
    });
    const systemFontFamily = systemFontFamilyService.systemFontFamily;
    const currentCustomFont = useLiveData(editorSettingService.editorSetting.settings$).customFontFamily;
    useEffect(() => {
        if (systemFontFamily.fontList$.value.length === 0) {
            systemFontFamily.loadFontList();
        }
        systemFontFamily.clearSearch();
    }, [systemFontFamily]);
    const isLoading = useLiveData(systemFontFamily.isLoading$);
    const result = useLiveData(systemFontFamily.result$);
    const searchText = useLiveData(systemFontFamily.searchText$);
    const onInputChange = useCallback((value) => {
        systemFontFamily.search(value);
    }, [systemFontFamily]);
    const onInputKeyDown = useCallback((e) => {
        e.stopPropagation(); // avoid typeahead search built-in in the menu
    }, []);
    return (_jsxs("div", { children: [_jsxs("div", { className: styles.InputContainer, children: [_jsx(SearchIcon, { className: styles.searchIcon }), _jsx(RowInput, { value: searchText ?? '', onChange: onInputChange, onKeyDown: onInputKeyDown, autoFocus: true, className: styles.searchInput, placeholder: "Fonts" })] }), _jsx(MenuSeparator, {}), isLoading ? (_jsx(Loading, {})) : (_jsxs(Scrollable.Root, { style: { height: '330px' }, children: [_jsx(Scrollable.Viewport, { children: result.length > 0 ? (_jsx(Virtuoso, { totalCount: result.length, components: {
                                Scroller: Scroller,
                            }, itemContent: index => (_jsx(FontMenuItem, { font: result[index], onSelect: onSelect, currentFont: currentCustomFont }, result[index].fullName)) })) : (_jsx("div", { className: styles.notFound, children: "No results found." })) }), _jsx(Scrollable.Scrollbar, {})] }))] }));
};
const FontMenuItem = ({ font, currentFont, onSelect, }) => {
    const handleFontSelect = useCallback(() => onSelect(font.family), [font, onSelect]);
    const fontFamily = getFontFamily(font.family);
    const selected = currentFont === font.fullName;
    return (_jsx("div", { style: { marginTop: '4px' }, children: _jsx(MenuItem, { onSelect: handleFontSelect, children: _jsxs("div", { className: styles.fontItemContainer, children: [_jsxs("div", { className: styles.fontItem, children: [_jsx("div", { className: styles.fontLabel, style: { fontFamily }, children: font.fullName }), _jsx("div", { className: clsx(styles.fontLabel, 'secondary'), children: font.fullName })] }), selected && (_jsx(DoneIcon, { fontSize: 20, className: styles.selectedIcon }))] }) }, font.fullName) }));
};
const CustomFontFamilySettings = () => {
    const t = useI18n();
    const { editorSettingService } = useServices({ EditorSettingService });
    const settings = useLiveData(editorSettingService.editorSetting.settings$);
    const fontFamily = getFontFamily(settings.customFontFamily);
    const onCustomFontFamilyChange = useCallback((fontFamily) => {
        editorSettingService.editorSetting.set('customFontFamily', fontFamily);
    }, [editorSettingService.editorSetting]);
    if (settings.fontFamily !== 'Custom' || !BUILD_CONFIG.isElectron) {
        return null;
    }
    return (_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.general.font-family.custom.title'](), desc: t['com.affine.settings.editorSettings.general.font-family.custom.description'](), children: _jsx(Menu, { items: _jsx(FontMenuItems, { onSelect: onCustomFontFamilyChange }), contentOptions: {
                align: 'end',
                style: { width: '250px', height: '380px' },
            }, children: _jsx(MenuTrigger, { className: styles.menuTrigger, style: { fontFamily }, children: settings.customFontFamily || 'Select a font' }) }) }));
};
const FontSizeSettings = () => {
    const t = useI18n();
    const { editorSettingService } = useServices({ EditorSettingService });
    const settings = useLiveData(editorSettingService.editorSetting.settings$);
    const onFontSizeChange = useCallback((fontSize) => {
        const size = fontSize[0];
        editorSettingService.editorSetting.set('fontSize', size);
        // Update CSS variable immediately
        document.documentElement.style.setProperty('--affine-font-base', `${size}px`);
    }, [editorSettingService.editorSetting]);
    // Apply current font size to CSS variable on mount
    useEffect(() => {
        document.documentElement.style.setProperty('--affine-font-base', `${settings.fontSize}px`);
    }, [settings.fontSize]);
    return (_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.general.font-size.title'](), desc: t['com.affine.settings.editorSettings.general.font-size.description'](), children: _jsxs("div", { className: styles.fontSizeContainer, children: [_jsx(Slider, { value: [settings.fontSize], onValueChange: onFontSizeChange, min: 12, max: 24, step: 1, className: styles.fontSizeSlider }), _jsxs("span", { className: styles.fontSizeValue, children: [settings.fontSize, "px"] })] }) }));
};
const menuContentOptions = {
    align: 'end',
    sideOffset: 16,
    style: { width: 250 },
};
const NewDocDefaultModeSettings = () => {
    const t = useI18n();
    const { editorSettingService } = useServices({ EditorSettingService });
    const settings = useLiveData(editorSettingService.editorSetting.settings$);
    const items = useMemo(() => [
        {
            value: 'page',
            label: t['Page'](),
            testId: 'page-mode-trigger',
        },
        {
            value: 'edgeless',
            label: t['Edgeless'](),
            testId: 'edgeless-mode-trigger',
        },
        {
            value: 'ask',
            label: t['com.affine.settings.editorSettings.ask-me-every-time'](),
            testId: 'ask-every-time-trigger',
        },
    ], [t]);
    const updateNewDocDefaultMode = useCallback((value) => {
        editorSettingService.editorSetting.set('newDocDefaultMode', value);
    }, [editorSettingService.editorSetting]);
    return (_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.general.default-new-doc.title'](), desc: t['com.affine.settings.editorSettings.general.default-new-doc.description'](), children: _jsx(Menu, { contentOptions: menuContentOptions, items: items.map(item => {
                return (_jsx(MenuItem, { selected: item.value === settings.newDocDefaultMode, onSelect: () => updateNewDocDefaultMode(item.value), "data-testid": item.testId, children: item.label }, item.value));
            }), children: _jsx(MenuTrigger, { className: styles.menuTrigger, "data-testid": "new-doc-default-mode-trigger", children: items.find(item => item.value === settings.newDocDefaultMode)?.label }) }) }));
};
const AISettings = () => {
    const t = useI18n();
    const { openConfirmModal } = useConfirmModal();
    const { featureFlagService, serverService } = useServices({
        FeatureFlagService,
        ServerService,
    });
    const serverFeatures = useLiveData(serverService.server.features$);
    const enableAI = useLiveData(featureFlagService.flags.enable_ai.$);
    const onAIChange = useCallback((checked) => {
        featureFlagService.flags.enable_ai.set(checked); // this will trigger page reload, see `FeatureFlagService`
    }, [featureFlagService]);
    const onToggleAI = useCallback((checked) => {
        openConfirmModal({
            title: checked
                ? t['com.affine.settings.editorSettings.general.ai.enable.title']()
                : t['com.affine.settings.editorSettings.general.ai.disable.title'](),
            description: checked
                ? t['com.affine.settings.editorSettings.general.ai.enable.description']()
                : t['com.affine.settings.editorSettings.general.ai.disable.description'](),
            confirmText: checked
                ? t['com.affine.settings.editorSettings.general.ai.enable.confirm']()
                : t['com.affine.settings.editorSettings.general.ai.disable.confirm'](),
            cancelText: t['Cancel'](),
            onConfirm: () => onAIChange(checked),
            confirmButtonOptions: {
                variant: checked ? 'primary' : 'error',
            },
        });
    }, [openConfirmModal, t, onAIChange]);
    if (!serverFeatures?.copilot) {
        return null;
    }
    return (_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.general.ai.title'](), desc: t['com.affine.settings.editorSettings.general.ai.description'](), children: _jsx(Switch, { checked: enableAI, onChange: onToggleAI }) }));
};
const SpellCheckSettings = () => {
    const t = useI18n();
    const spellCheckSetting = useService(SpellCheckSettingService);
    const desktopApiService = useService(DesktopApiService);
    const enabled = useLiveData(spellCheckSetting.enabled$)?.enabled;
    const [requireRestart, setRequireRestart] = useState(false);
    const onToggleSpellCheck = useCallback((checked) => {
        spellCheckSetting.setEnabled(checked);
        setRequireRestart(true);
    }, [spellCheckSetting]);
    const onRestart = useAsyncCallback(async () => {
        await desktopApiService.handler.ui.restartApp();
    }, [desktopApiService]);
    return (_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.general.spell-check.title'](), desc: requireRestart ? (_jsx("div", { className: styles.spellCheckSettingDescription, children: _jsxs(Trans, { i18nKey: "com.affine.settings.editorSettings.general.spell-check.restart-hint", children: ["Settings changed; please restart the app.", _jsx("button", { onClick: onRestart, className: styles.spellCheckSettingDescriptionButton, children: "Restart" })] }) })) : (t['com.affine.settings.editorSettings.general.spell-check.description']()), children: _jsx(Switch, { checked: enabled, onChange: onToggleSpellCheck }) }));
};
const MiddleClickPasteSettings = () => {
    const t = useI18n();
    const editorSettingService = useService(EditorSettingService);
    const settings = useLiveData(editorSettingService.editorSetting.settings$);
    const onToggleMiddleClickPaste = useCallback((checked) => {
        editorSettingService.editorSetting.set('enableMiddleClickPaste', checked);
    }, [editorSettingService.editorSetting]);
    return (_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.general.middle-click-paste.title'](), desc: t['com.affine.settings.editorSettings.general.middle-click-paste.description'](), children: _jsx(Switch, { checked: settings.enableMiddleClickPaste, onChange: onToggleMiddleClickPaste }) }));
};
export const General = () => {
    const t = useI18n();
    return (_jsxs(SettingWrapper, { title: t['com.affine.settings.editorSettings.general'](), children: [_jsx(AISettings, {}), _jsx(FontFamilySettings, {}), _jsx(CustomFontFamilySettings, {}), _jsx(FontSizeSettings, {}), _jsx(NewDocDefaultModeSettings, {}), BUILD_CONFIG.isElectron && _jsx(SpellCheckSettings, {}), environment.isLinux && _jsx(MiddleClickPasteSettings, {})] }));
};
//# sourceMappingURL=general.js.map