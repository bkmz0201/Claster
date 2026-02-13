import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RadioGroup, Switch } from '@affine/component';
import { SettingRow, SettingWrapper, } from '@affine/component/setting-components';
import { EditorSettingService } from '@affine/core/modules/editor-setting';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';
import { settingWrapper } from './style.css';
export const Page = () => {
    const t = useI18n();
    const editorSetting = useService(EditorSettingService).editorSetting;
    const settings = useLiveData(editorSetting.settings$);
    const radioItems = useMemo(() => [
        {
            value: 'standard',
            label: t['com.affine.settings.editorSettings.page.default-page-width.standard'](),
            testId: 'standard-width-trigger',
        },
        {
            value: 'fullWidth',
            label: t['com.affine.settings.editorSettings.page.default-page-width.full-width'](),
            testId: 'full-width-trigger',
        },
    ], [t]);
    const handleFullWidthLayoutChange = useCallback((value) => {
        const checked = value === 'fullWidth';
        editorSetting.set('fullWidthLayout', checked);
    }, [editorSetting]);
    const handleDisplayDocInfoChange = useCallback((checked) => {
        editorSetting.set('displayDocInfo', checked);
    }, [editorSetting]);
    const handleDisplayBiDirectionalLinkChange = useCallback((checked) => {
        editorSetting.set('displayBiDirectionalLink', checked);
    }, [editorSetting]);
    return (_jsxs(SettingWrapper, { title: t['com.affine.settings.editorSettings.page'](), children: [_jsx(SettingRow, { name: t['com.affine.settings.editorSettings.page.default-page-width.title'](), desc: t['com.affine.settings.editorSettings.page.default-page-width.description'](), children: _jsx(RadioGroup, { items: radioItems, value: settings.fullWidthLayout ? 'fullWidth' : 'standard', width: 250, className: settingWrapper, onChange: handleFullWidthLayoutChange }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.page.display-doc-info.title'](), desc: t['com.affine.settings.editorSettings.page.display-doc-info.description'](), children: _jsx(Switch, { "data-testid": "display-doc-info-trigger", checked: settings.displayDocInfo, onChange: handleDisplayDocInfoChange }) }), _jsx(SettingRow, { name: t['com.affine.settings.editorSettings.page.display-bi-link.title'](), desc: t['com.affine.settings.editorSettings.page.display-bi-link.description'](), children: _jsx(Switch, { "data-testid": "display-bi-link-trigger", checked: settings.displayBiDirectionalLink, onChange: handleDisplayBiDirectionalLinkChange }) })] }));
};
//# sourceMappingURL=page.js.map