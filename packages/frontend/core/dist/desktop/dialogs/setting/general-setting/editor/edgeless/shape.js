import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger, RadioGroup, Slider, } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { EdgelessCRUDIdentifier, getSurfaceBlock, } from '@blocksuite/affine/blocks/surface';
import { DefaultTheme, FontFamily, FontFamilyMap, FontStyle, FontWeightMap, getShapeName, ShapeStyle, ShapeType, StrokeStyle, TextAlign, } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger, preViewLabelWrapper, settingWrapper, shapeIndicator, } from '../style.css';
import { sortedFontWeightEntries, usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';
var ShapeTextFontSize;
(function (ShapeTextFontSize) {
    ShapeTextFontSize["16px"] = "16";
    ShapeTextFontSize["20px"] = "20";
    ShapeTextFontSize["24px"] = "24";
    ShapeTextFontSize["32px"] = "32";
    ShapeTextFontSize["40px"] = "40";
    ShapeTextFontSize["64px"] = "64";
})(ShapeTextFontSize || (ShapeTextFontSize = {}));
export const ShapeSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { palettes: strokeColorPalettes, getCurrentColor: getCurrentStrokeColor, } = usePalettes(DefaultTheme.StrokeColorShortPalettes, DefaultTheme.shapeStrokeColor);
    const { palettes: fillColorPalettes, getCurrentColor: getCurrentFillColor } = usePalettes(DefaultTheme.FillColorShortPalettes, DefaultTheme.shapeFillColor);
    const { palettes: textColorPalettes, getCurrentColor: getCurrentTextColor } = usePalettes(DefaultTheme.ShapeTextColorShortPalettes, DefaultTheme.shapeTextColor, true);
    const [currentShape, setCurrentShape] = useState(ShapeType.Rect);
    const shapeStyleItems = useMemo(() => [
        {
            value: ShapeStyle.General,
            label: t['com.affine.settings.editorSettings.edgeless.style.general'](),
        },
        {
            value: ShapeStyle.Scribbled,
            label: t['com.affine.settings.editorSettings.edgeless.style.scribbled'](),
        },
    ], [t]);
    const { shapeStyle } = settings[`shape:${currentShape}`];
    const setShapeStyle = useCallback((value) => {
        editorSetting.set(`shape:${currentShape}`, {
            shapeStyle: value,
        });
    }, [editorSetting, currentShape]);
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
    const borderStyle = settings[`shape:${currentShape}`].strokeStyle;
    const setBorderStyle = useCallback((value) => {
        editorSetting.set(`shape:${currentShape}`, {
            strokeStyle: value,
        });
    }, [editorSetting, currentShape]);
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
    const textAlignment = settings[`shape:${currentShape}`].textAlign;
    const setTextAlignment = useCallback((value) => {
        editorSetting.set(`shape:${currentShape}`, {
            textAlign: value,
        });
    }, [editorSetting, currentShape]);
    const shapes = useMemo(() => [
        {
            value: ShapeType.Rect,
            label: t['com.affine.settings.editorSettings.edgeless.shape.square'](),
        },
        {
            value: ShapeType.Ellipse,
            label: t['com.affine.settings.editorSettings.edgeless.shape.ellipse'](),
        },
        {
            value: ShapeType.Diamond,
            label: t['com.affine.settings.editorSettings.edgeless.shape.diamond'](),
        },
        {
            value: ShapeType.Triangle,
            label: t['com.affine.settings.editorSettings.edgeless.shape.triangle'](),
        },
        {
            value: 'roundedRect',
            label: t['com.affine.settings.editorSettings.edgeless.shape.rounded-rectangle'](),
        },
    ], [t]);
    const docs = useMemo(() => [
        {
            value: 'shape',
            label: t['com.affine.settings.editorSettings.edgeless.shape.list'](),
        },
        {
            value: 'flow',
            label: t['com.affine.settings.editorSettings.edgeless.shape.flow'](),
        },
    ], [t]);
    const [currentDoc, setCurrentDoc] = useState('shape');
    const fillColorItems = useMemo(() => {
        const { fillColor } = settings[`shape:${currentShape}`];
        return fillColorPalettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { fillColor: value });
            };
            const isSelected = isEqual(fillColor, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, currentShape, fillColorPalettes]);
    const strokeColorItems = useMemo(() => {
        const { strokeColor } = settings[`shape:${currentShape}`];
        return strokeColorPalettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { strokeColor: value });
            };
            const isSelected = isEqual(strokeColor, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, currentShape, strokeColorPalettes]);
    const borderThickness = settings[`shape:${currentShape}`].strokeWidth;
    const setBorderThickness = useCallback((value) => {
        editorSetting.set(`shape:${currentShape}`, {
            strokeWidth: value[0],
        });
    }, [editorSetting, currentShape]);
    const fontFamilyItems = useMemo(() => {
        const { fontFamily } = settings[`shape:${currentShape}`];
        return Object.entries(FontFamily).map(([name, value]) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { fontFamily: value });
            };
            const isSelected = fontFamily === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings, currentShape]);
    const fontStyleItems = useMemo(() => {
        const { fontStyle } = settings[`shape:${currentShape}`];
        return Object.entries(FontStyle).map(([name, value]) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { fontStyle: value });
            };
            const isSelected = fontStyle === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings, currentShape]);
    const fontWeightItems = useMemo(() => {
        const { fontWeight } = settings[`shape:${currentShape}`];
        return sortedFontWeightEntries.map(([name, value]) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { fontWeight: value });
            };
            const isSelected = fontWeight === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings, currentShape]);
    const fontSizeItems = useMemo(() => {
        const { fontSize } = settings[`shape:${currentShape}`];
        return Object.entries(ShapeTextFontSize).map(([name, value]) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { fontSize: Number(value) });
            };
            const isSelected = fontSize === Number(value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings, currentShape]);
    const textColorItems = useMemo(() => {
        const { color } = settings[`shape:${currentShape}`];
        return textColorPalettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set(`shape:${currentShape}`, { color: value });
            };
            const isSelected = isEqual(color, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, currentShape, textColorPalettes]);
    const getElements = useCallback((doc) => {
        const surface = getSurfaceBlock(doc);
        if (!surface)
            return [];
        return surface.getElementsByType('shape').filter(node => {
            const shape = node;
            const { shapeType, radius } = shape;
            const shapeName = getShapeName(shapeType, radius);
            return shapeName === currentShape;
        });
    }, [currentShape]);
    const firstUpdate = useCallback((doc, editorHost) => {
        const surface = getSurfaceBlock(doc);
        if (!surface)
            return;
        const crud = editorHost.std.get(EdgelessCRUDIdentifier);
        doc.readonly = false;
        surface.getElementsByType('shape').forEach(node => {
            const shape = node;
            const { shapeType, radius } = shape;
            const shapeName = getShapeName(shapeType, radius);
            const props = editorSetting.get(`shape:${shapeName}`);
            crud.updateElement(shape.id, props);
        });
        doc.readonly = true;
    }, [editorSetting]);
    const fillColor = useMemo(() => {
        const color = settings[`shape:${currentShape}`].fillColor;
        return getCurrentFillColor(color);
    }, [currentShape, getCurrentFillColor, settings]);
    const strokeColor = useMemo(() => {
        const color = settings[`shape:${currentShape}`].strokeColor;
        return getCurrentStrokeColor(color);
    }, [currentShape, getCurrentStrokeColor, settings]);
    const textColor = useMemo(() => {
        const color = settings[`shape:${currentShape}`].color;
        return getCurrentTextColor(color);
    }, [currentShape, getCurrentTextColor, settings]);
    const height = currentDoc === 'flow' ? 456 : 180;
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.shape'](), docName: currentDoc, keyName: `shape:${currentShape}`, height: height, getElements: getElements, firstUpdate: firstUpdate, children: _jsx(RadioGroup, { value: currentDoc, items: docs, onChange: setCurrentDoc, style: {
                        position: 'absolute',
                        right: '10px',
                        bottom: '10px',
                    }, className: preViewLabelWrapper }) }, currentDoc), _jsx(RadioGroup, { padding: 0, gap: 4, itemHeight: 28, borderRadius: 8, value: currentShape, items: shapes, onChange: setCurrentShape, style: { background: 'transparent', marginBottom: '16px' }, indicatorClassName: shapeIndicator }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.style'](), desc: '', children: _jsx(RadioGroup, { items: shapeStyleItems, value: shapeStyle, width: 250, className: settingWrapper, onChange: setShapeStyle }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.fill-color'](), desc: '', children: fillColor ? (_jsx(DropdownMenu, { items: fillColorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: fillColor.resolvedValue }), children: fillColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.border-color'](), desc: '', children: strokeColor ? (_jsx(DropdownMenu, { items: strokeColorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: strokeColor.resolvedValue }), children: strokeColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.border-style'](), desc: '', children: _jsx(RadioGroup, { items: borderStyleItems, value: borderStyle, width: 250, className: settingWrapper, onChange: setBorderStyle }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.border-thickness'](), desc: '', children: _jsx(Slider, { value: [borderThickness], onValueChange: setBorderThickness, min: 2, max: 12, step: 2, nodes: [2, 4, 6, 8, 10, 12], disabled: borderStyle === StrokeStyle.None }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.text-color'](), desc: '', children: textColor ? (_jsx(DropdownMenu, { items: textColorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: textColor.resolvedValue }), children: textColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-family'](), desc: '', children: _jsx(DropdownMenu, { items: fontFamilyItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: FontFamilyMap[settings[`shape:${currentShape}`].fontFamily] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.font-size'](), desc: '', children: _jsx(DropdownMenu, { items: fontSizeItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: settings[`shape:${currentShape}`].fontSize + 'px' }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-style'](), desc: '', children: _jsx(DropdownMenu, { items: fontStyleItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: settings[`shape:${currentShape}`].fontStyle }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-weight'](), desc: '', children: _jsx(DropdownMenu, { items: fontWeightItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: FontWeightMap[settings[`shape:${currentShape}`].fontWeight] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.text-alignment'](), desc: '', children: _jsx(RadioGroup, { items: alignItems, value: textAlignment, width: 250, className: settingWrapper, onChange: setTextAlignment }) })] }));
};
//# sourceMappingURL=shape.js.map