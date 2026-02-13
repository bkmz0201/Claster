import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useExportPage } from '@affine/core/components/hooks/affine/use-export-page';
import { ExportMenuItems, PrintMenuItems, } from '@affine/core/components/page-list';
import { EditorService } from '@affine/core/modules/editor';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import * as styles from './index.css';
export const ShareExport = () => {
    const t = useI18n();
    const editor = useService(EditorService).editor;
    const exportHandler = useExportPage();
    const currentMode = useLiveData(editor.mode$);
    return (_jsxs("div", { className: styles.exportContainerStyle, children: [_jsx("div", { className: styles.descriptionStyle, children: t['com.affine.share-menu.ShareViaExportDescription']() }), _jsx("div", { className: styles.exportContainerStyle, children: _jsx(ExportMenuItems, { exportHandler: exportHandler, className: styles.exportItemStyle, pageMode: currentMode }) }), currentMode === 'page' && (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.descriptionStyle, children: t['com.affine.share-menu.ShareViaPrintDescription']() }), _jsx("div", { children: _jsx(PrintMenuItems, { exportHandler: exportHandler, className: styles.exportItemStyle }) })] }))] }));
};
//# sourceMappingURL=share-export.js.map