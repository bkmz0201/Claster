import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuTrigger, RadioGroup, } from '@affine/component';
import { SettingRow } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { getSurfaceBlock } from '@blocksuite/affine/blocks/surface';
import { LayoutType, MindmapStyle } from '@blocksuite/affine/model';
import { useFramework, useLiveData } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { DropdownMenu } from '../menu';
import { menuTrigger, settingWrapper } from '../style.css';
import { EdgelessSnapshot } from './snapshot';
const MINDMAP_STYLES = [
    {
        value: MindmapStyle.ONE,
        name: 'Style 1',
    },
    {
        value: MindmapStyle.TWO,
        name: 'Style 2',
    },
    {
        value: MindmapStyle.THREE,
        name: 'Style 3',
    },
    {
        value: MindmapStyle.FOUR,
        name: 'Style 4',
    },
];
export const MindMapSettings = () => {
    const t = useI18n();
    const framework = useFramework();
    const { editorSetting } = framework.get(EditorSettingService);
    const settings = useLiveData(editorSetting.settings$);
    const { layoutType } = settings.mindmap;
    const setLayoutType = useCallback((value) => {
        editorSetting.set('mindmap', {
            layoutType: value,
        });
    }, [editorSetting]);
    const layoutTypeItems = useMemo(() => [
        {
            value: LayoutType.LEFT,
            label: t['com.affine.settings.editorSettings.edgeless.mind-map.layout.left'](),
        },
        {
            value: LayoutType.BALANCE,
            label: t['com.affine.settings.editorSettings.edgeless.mind-map.layout.radial'](),
        },
        {
            value: LayoutType.RIGHT,
            label: t['com.affine.settings.editorSettings.edgeless.mind-map.layout.right'](),
        },
    ], [t]);
    const styleItems = useMemo(() => {
        const { style } = settings.mindmap;
        return MINDMAP_STYLES.map(({ name, value }) => {
            const handler = () => {
                editorSetting.set('mindmap', { style: value });
            };
            const isSelected = style === value;
            return (_jsx(MenuItem, { onSelect: handler, selected: isSelected, children: name }, name));
        });
    }, [editorSetting, settings]);
    const getElements = useCallback((doc) => {
        const surface = getSurfaceBlock(doc);
        return surface?.getElementsByType('mindmap') || [];
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(EdgelessSnapshot, { title: t['com.affine.settings.editorSettings.edgeless.mind-map'](), docName: "mindmap", keyName: 'mindmap', getElements: getElements, height: 320 }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.style'](), desc: '', children: _jsx(DropdownMenu, { items: styleItems, trigger: _jsx(MenuTrigger, { className: menuTrigger, children: `Style ${settings.mindmap.style}` }) }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.edgeless.mind-map.layout'](), desc: '', children: _jsx(RadioGroup, { items: layoutTypeItems, value: layoutType, width: 250, className: settingWrapper, onChange: setLayoutType }) })] }));
};
//# sourceMappingURL=mind-map.js.map