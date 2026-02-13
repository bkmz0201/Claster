import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger, RadioGroup, Slider, } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { getSurfaceBlock } from '@blocksuite/affine/blocks/surface';
import { ConnectorMode, DefaultTheme, FontFamily, FontFamilyMap, FontStyle, FontWeightMap, PointStyle, StrokeStyle, TextAlign, } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger, settingWrapper } from '../style.css';
import { sortedFontWeightEntries, usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';
var ConnecterStyle;
(function (ConnecterStyle) {
    ConnecterStyle["General"] = "general";
    ConnecterStyle["Scribbled"] = "scribbled";
})(ConnecterStyle || (ConnecterStyle = {}));
var ConnectorTextFontSize;
(function (ConnectorTextFontSize) {
    ConnectorTextFontSize["16px"] = "16";
    ConnectorTextFontSize["20px"] = "20";
    ConnectorTextFontSize["24px"] = "24";
    ConnectorTextFontSize["32px"] = "32";
    ConnectorTextFontSize["40px"] = "40";
    ConnectorTextFontSize["64px"] = "64";
})(ConnectorTextFontSize || (ConnectorTextFontSize = {}));
export const ConnectorSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { palettes: StrokeColorShortPalettes, getCurrentColor: getCurrentStrokeColor, } = usePalettes(DefaultTheme.StrokeColorShortPalettes, DefaultTheme.connectorColor);
    const { palettes: textColorPalettes, getCurrentColor: getCurrentTextColor } = usePalettes(DefaultTheme.StrokeColorShortPalettes, DefaultTheme.black);
    const connecterStyleItems = useMemo(() => [
        {
            value: ConnecterStyle.General,
            label: t['com.affine.settings.editorSettings.edgeless.style.general'](),
        },
        {
            value: ConnecterStyle.Scribbled,
            label: t['com.affine.settings.editorSettings.edgeless.style.scribbled'](),
        },
    ], [t]);
    const connecterStyle = settings.connector.rough
        ? ConnecterStyle.Scribbled
        : ConnecterStyle.General;
    const setConnecterStyle = useCallback((value) => {
        const isRough = value === ConnecterStyle.Scribbled;
        editorSetting.set('connector', {
            rough: isRough,
        });
    }, [editorSetting]);
    const connectorShapeItems = useMemo(() => [
        {
            value: ConnectorMode.Orthogonal,
            label: t['com.affine.settings.editorSettings.edgeless.connecter.connector-shape.elbowed'](),
        },
        {
            value: ConnectorMode.Curve,
            label: t['com.affine.settings.editorSettings.edgeless.connecter.connector-shape.curve'](),
        },
        {
            value: ConnectorMode.Straight,
            label: t['com.affine.settings.editorSettings.edgeless.connecter.connector-shape.straight'](),
        },
    ], [t]);
    const connectorShape = settings.connector.mode;
    const setConnectorShape = useCallback((value) => {
        editorSetting.set('connector', {
            mode: value,
        });
    }, [editorSetting]);
    const borderStyleItems = useMemo(() => [
        {
            value: StrokeStyle.Solid,
            label: t['com.affine.settings.editorSettings.edgeless.note.border.solid'](),
        },
        {
            value: StrokeStyle.Dash,
            label: t['com.affine.settings.editorSettings.edgeless.note.border.dash'](),
        },
    ], [t]);
    const borderStyle = settings.connector.strokeStyle;
    const setBorderStyle = useCallback((value) => {
        editorSetting.set('connector', {
            strokeStyle: value,
        });
    }, [editorSetting]);
    const borderThickness = settings.connector.strokeWidth;
    const setBorderThickness = useCallback((value) => {
        editorSetting.set('connector', {
            strokeWidth: value[0],
        });
    }, [editorSetting]);
    const currentColor = useMemo(() => {
        const color = settings.connector.stroke;
        return getCurrentStrokeColor(color);
    }, [getCurrentStrokeColor, settings.connector.stroke]);
    const colorItems = useMemo(() => {
        const { stroke } = settings.connector;
        return StrokeColorShortPalettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set('connector', { stroke: value });
            };
            const isSelected = isEqual(stroke, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, StrokeColorShortPalettes]);
    const startEndPointItems = useMemo(() => {
        const { frontEndpointStyle } = settings.connector;
        return Object.entries(PointStyle).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('connector', { frontEndpointStyle: value });
            };
            const isSelected = frontEndpointStyle === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const endEndPointItems = useMemo(() => {
        const { rearEndpointStyle } = settings.connector;
        return Object.entries(PointStyle).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('connector', { rearEndpointStyle: value });
            };
            const isSelected = rearEndpointStyle === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
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
    const textAlignment = settings.connector.labelStyle.textAlign;
    const setTextAlignment = useCallback((value) => {
        editorSetting.set('connector', {
            labelStyle: {
                textAlign: value,
            },
        });
    }, [editorSetting]);
    const fontFamilyItems = useMemo(() => {
        const { fontFamily } = settings.connector.labelStyle;
        return Object.entries(FontFamily).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('connector', {
                    labelStyle: {
                        fontFamily: value,
                    },
                });
            };
            const isSelected = fontFamily === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const fontStyleItems = useMemo(() => {
        const { fontStyle } = settings.connector.labelStyle;
        return Object.entries(FontStyle).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('connector', {
                    labelStyle: {
                        fontStyle: value,
                    },
                });
            };
            const isSelected = fontStyle === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const fontWeightItems = useMemo(() => {
        const { fontWeight } = settings.connector.labelStyle;
        return sortedFontWeightEntries.map(([name, value]) => {
            const handler = () => {
                editorSetting.set('connector', {
                    labelStyle: {
                        fontWeight: value,
                    },
                });
            };
            const isSelected = fontWeight === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const fontSizeItems = useMemo(() => {
        const { fontSize } = settings.connector.labelStyle;
        return Object.entries(ConnectorTextFontSize).map(([name, value]) => {
            const handler = () => {
                editorSetting.set('connector', {
                    labelStyle: {
                        fontSize: Number(value),
                    },
                });
            };
            const isSelected = fontSize === Number(value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const textColorItems = useMemo(() => {
        const { color } = settings.connector.labelStyle;
        return textColorPalettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set('connector', {
                    labelStyle: {
                        color: value,
                    },
                });
            };
            const isSelected = isEqual(color, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings, textColorPalettes]);
    const textColor = useMemo(() => {
        const { color } = settings.connector.labelStyle;
        return getCurrentTextColor(color);
    }, [getCurrentTextColor, settings]);
    const getElements = useCallback((doc) => {
        const surface = getSurfaceBlock(doc);
        return surface?.getElementsByType('connector') || [];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.connecter'](), docName: "connector", keyName: "connector", getElements: getElements }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.connecter.color'](), desc: '', children: currentColor ? (_jsx(DropdownMenu, { items: colorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: currentColor.resolvedValue }), children: currentColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.style'](), desc: '', children: _jsx(RadioGroup, { items: connecterStyleItems, value: connecterStyle, width: 250, className: settingWrapper, onChange: setConnecterStyle }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.connecter.connector-shape'](), desc: '', children: _jsx(RadioGroup, { items: connectorShapeItems, value: connectorShape, width: 250, className: settingWrapper, onChange: setConnectorShape }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.connecter.border-style'](), desc: '', children: _jsx(RadioGroup, { items: borderStyleItems, value: borderStyle, width: 250, className: settingWrapper, onChange: setBorderStyle }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.connecter.border-thickness'](), desc: '', children: _jsx(Slider, { value: [borderThickness], onValueChange: setBorderThickness, min: 2, max: 12, step: 2, nodes: [2, 4, 6, 8, 10, 12] }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.connecter.start-endpoint'](), desc: '', children: _jsx(DropdownMenu, { items: startEndPointItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: String(settings.connector.frontEndpointStyle) }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.connecter.end-endpoint'](), desc: '', children: _jsx(DropdownMenu, { items: endEndPointItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: String(settings.connector.rearEndpointStyle) }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.text-color'](), desc: '', children: textColor ? (_jsx(DropdownMenu, { items: textColorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: textColor.resolvedValue }), children: textColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-family'](), desc: '', children: _jsx(DropdownMenu, { items: fontFamilyItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: FontFamilyMap[settings.connector.labelStyle.fontFamily] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.font-size'](), desc: '', children: _jsx(DropdownMenu, { items: fontSizeItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: settings.connector.labelStyle.fontSize + 'px' }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-style'](), desc: '', children: _jsx(DropdownMenu, { items: fontStyleItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: settings.connector.labelStyle.fontStyle }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.text.font-weight'](), desc: '', children: _jsx(DropdownMenu, { items: fontWeightItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: FontWeightMap[settings.connector.labelStyle.fontWeight] }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.shape.text-alignment'](), desc: '', children: _jsx(RadioGroup, { items: alignItems, value: textAlignment, width: 250, className: settingWrapper, onChange: setTextAlignment }) })] }));
};
//# sourceMappingURL=connector.js.map