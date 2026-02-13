import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger, Slider } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { getSurfaceBlock } from '@blocksuite/affine/blocks/surface';
import { DefaultTheme } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger } from '../style.css';
import { usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';
export const PenSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { palettes, getCurrentColor } = usePalettes(DefaultTheme.StrokeColorShortPalettes, DefaultTheme.black);
    const currentColor = useMemo(() => {
        return getCurrentColor(settings.brush.color);
    }, [getCurrentColor, settings.brush.color]);
    const colorItems = useMemo(() => {
        const { color } = settings.brush;
        return palettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set('brush', { color: value });
            };
            const isSelected = isEqual(color, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, settings.brush, palettes]);
    const borderThickness = settings.brush.lineWidth;
    const setBorderThickness = useCallback((value) => {
        editorSetting.set('brush', {
            lineWidth: value[0],
        });
    }, [editorSetting]);
    const getElements = useCallback((doc) => {
        const surface = getSurfaceBlock(doc);
        return surface?.getElementsByType('brush') || [];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.pen'](), docName: "pen", keyName: "brush", getElements: getElements }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.pen.color'](), desc: '', children: currentColor ? (_jsx(DropdownMenu, { items: colorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: currentColor.resolvedValue }), children: currentColor.key }) })) : null }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.pen.thickness'](), desc: '', children: _jsx(Slider, { value: [borderThickness], onValueChange: setBorderThickness, min: 2, max: 12, step: 2, nodes: [2, 4, 6, 8, 10, 12] }) })] }));
};
//# sourceMappingURL=pen.js.map