import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SettingWrapper } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';
import { ConnectorSettings } from './connector';
import { FrameSettings } from './frame';
import { GeneralEdgelessSetting } from './general';
import { MindMapSettings } from './mind-map';
import { NoteSettings } from './note';
import { PenSettings } from './pen';
import { ShapeSettings } from './shape';
import { TextSettings } from './text';
export const Edgeless = () => {
    const t = useI18n();
    return (_jsxs(SettingWrapper, { title: t['com.affine.settings.editorSettings.edgeless'](), children: [_jsx(GeneralEdgelessSetting, {}), _jsx(NoteSettings, {}), _jsx(TextSettings, {}), _jsx(ShapeSettings, {}), _jsx(FrameSettings, {}), _jsx(ConnectorSettings, {}), _jsx(PenSettings, {}), _jsx(MindMapSettings, {})] }));
};
//# sourceMappingURL=edgeless.js.map