import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { DefaultTheme } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger } from '../style.css';
import { usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';
export const FrameSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { palettes, getCurrentColor } = usePalettes([
        { key: 'Transparent', value: DefaultTheme.transparent },
        ...DefaultTheme.FillColorShortPalettes,
    ], DefaultTheme.transparent);
    const { background } = settings['affine:frame'];
    const currentColor = useMemo(() => {
        return getCurrentColor(background);
    }, [getCurrentColor, background]);
    const colorItems = useMemo(() => {
        return palettes.map(({ key, value, resolvedValue }) => {
            const handler = () => {
                editorSetting.set('affine:frame', { background: value });
            };
            const isSelected = isEqual(background, value);
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, prefix: _jsx(Point, { color: resolvedValue }), children: key }, key));
        });
    }, [editorSetting, background, palettes]);
    const getElements = useCallback((doc) => {
        return doc.getBlocksByFlavour('affine:frame') || [];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.frame'](), docName: "frame", keyName: "affine:frame", getElements: getElements }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.frame.background'](), desc: '', children: currentColor ? (_jsx(DropdownMenu, { items: colorItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, prefix: _jsx(Point, { color: currentColor.resolvedValue }), children: currentColor.key }) })) : null })] }));
};
//# sourceMappingURL=frame.js.map