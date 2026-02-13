import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger, RadioGroup, Slider, } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { createEnumMap, DefaultTheme, NoteShadow, NoteShadowMap, StrokeStyle, } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger, settingWrapper } from '../style.css';
import { usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';
var CornerSize;
(function (CornerSize) {
    CornerSize[CornerSize["None"] = 0] = "None";
    CornerSize[CornerSize["Small"] = 8] = "Small";
    CornerSize[CornerSize["Medium"] = 16] = "Medium";
    CornerSize[CornerSize["Large"] = 24] = "Large";
    CornerSize[CornerSize["Huge"] = 32] = "Huge";
})(CornerSize || (CornerSize = {}));
const CornerSizeMap = createEnumMap(CornerSize);
const CORNER_SIZE = [
    { name: 'None', value: CornerSize.None },
    { name: 'Small', value: CornerSize.Small },
    { name: 'Medium', value: CornerSize.Medium },
    { name: 'Large', value: CornerSize.Large },
    { name: 'Huge', value: CornerSize.Huge },
];
export const NoteSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { palettes, getCurrentColor } = usePalettes(DefaultTheme.NoteBackgroundColorPalettes, DefaultTheme.noteBackgrounColor);
    const borderStyleItems = useMemo(() => [
        {
            value: StrokeStyle.Solid,
            label: t['com.affine.settings.editorSettings.edgeless.note.border.solid'](),
        },
        {
            value: StrokeStyle.Dash,
            label: t['com.affine.settings.editorSettings.edgeless.note.border.dash'](),
        },
        {
            value: StrokeStyle.None,
            label: t['com.affine.settings.editorSettings.edgeless.note.border.none'](),
        },
    ], [t]);
    const { borderStyle } = settings['affine:note'].edgeless.style;
    const setBorderStyle = useCallback((value) => {
        editorSetting.set('affine:note', {
            edgeless: {
                style: {
                    borderStyle: value,
                },
            },
        });
    }, [editorSetting]);
    const { borderSize } = settings['affine:note'].edgeless.style;
    const setBorderSize = useCallback((value) => {
        editorSetting.set('affine:note', {
            edgeless: {
                style: {
                    borderSize: value[0],
                },
            },
        });
    }, [editorSetting]);
    const backgroundItems = useMemo(() => {
        const { background } = settings['affine:note'];
        return palettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set('affine:note', { background: value });
            };
            const isSelected = isEqual(background, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, palettes]);
    const cornerItems = useMemo(() => {
        const { borderRadius } = settings['affine:note'].edgeless.style;
        return CORNER_SIZE.map(({ name, value }) => {
            const handler = () => {
                editorSetting.set('affine:note', {
                    edgeless: {
                        style: {
                            borderRadius: value,
                        },
                    },
                });
            };
            const isSelected = borderRadius === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const shadowItems = useMemo(() => {
        const { shadowType } = settings['affine:note'].edgeless.style;
        return Object.entries(NoteShadow).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('affine:note', {
                    edgeless: {
                        style: {
                            shadowType: value,
                        },
                    },
                });
            };
            const isSelected = shadowType === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const currentColor = useMemo(() => {
        const { background } = settings['affine:note'];
        return getCurrentColor(background);
    }, [getCurrentColor, settings]);
    const getElements = useCallback((doc) => {
        return doc.getBlocksByFlavour('affine:note') || [];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.note'](), docName: "note", keyName: "affine:note", getElements: getElements, height: 240 }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.note.background'](), desc: '', children: currentColor ? (_jsx(DropdownMenu, { items: backgroundItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: currentColor.resolvedValue }), children: currentColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.note.corners'](), desc: '', children: _jsx(DropdownMenu, { items: cornerItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: CornerSizeMap[settings['affine:note'].edgeless.style
                            .borderRadius] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.note.shadow'](), desc: '', children: _jsx(DropdownMenu, { items: shadowItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: NoteShadowMap[settings['affine:note'].edgeless.style.shadowType] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.note.border'](), desc: '', children: _jsx(RadioGroup, { items: borderStyleItems, value: borderStyle, width: 250, className: settingWrapper, onChange: setBorderStyle }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.note.border-thickness'](), desc: '', children: _jsx(Slider, { value: [borderSize], onValueChange: setBorderSize, min: 2, max: 12, step: 2, nodes: [2, 4, 6, 8, 10, 12], disabled: borderStyle === StrokeStyle.None }) })] }));
};
//# sourceMappingURL=note.js.map