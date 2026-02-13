import { jsx as _jsx } from "react/jsx-runtime";
import { getBaseFontStyleOptions } from '@affine/core/desktop/dialogs/setting/general-setting/editor/general';
import { EditorSettingService, } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { SettingDropdownSelect } from '../dropdown-select';
import { RowLayout } from '../row.layout';
export const FontStyleSetting = () => {
    const t = useI18n();
    const editorSetting = useService(EditorSettingService).editorSetting;
    const fontFamily = useLiveData(editorSetting.settings$.selector(s => s.fontFamily));
    const options = useMemo(() => getBaseFontStyleOptions(t), [t]);
    const handleEdit = useCallback((v) => {
        editorSetting.set('fontFamily', v);
    }, [editorSetting]);
    return (_jsx(RowLayout, { label: t['com.affine.mobile.setting.appearance.font'](), children: _jsx(SettingDropdownSelect, { options: options, value: fontFamily, onChange: handleEdit }) }));
};
//# sourceMappingURL=font.js.map