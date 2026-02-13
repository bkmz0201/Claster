import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SettingHeader } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';
import { Edgeless } from './edgeless';
import { General } from './general';
import { Page } from './page';
export const EditorSettings = () => {
    const t = useI18n();
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.settings.editorSettings.title'](), subtitle: t['com.affine.settings.editorSettings.subtitle']() }), _jsx(General, {}), _jsx(Page, {}), _jsx(Edgeless, {})] }));
};
//# sourceMappingURL=index.js.map