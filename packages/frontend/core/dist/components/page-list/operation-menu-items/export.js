import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, MenuSeparator, MenuSub } from '@affine/component';
import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import { ExportIcon, ExportToHtmlIcon, ExportToMarkdownIcon, ExportToPngIcon, PageIcon, PrinterIcon, } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { transitionStyle } from './index.css';
export function ExportMenuItem({ onSelect, className, type, icon, label, }) {
    return (_jsx(MenuItem, { className: className, "data-testid": `export-to-${type}`, onSelect: onSelect, block: true, prefixIcon: icon, children: label }));
}
export const PrintMenuItems = ({ exportHandler, className = transitionStyle, }) => {
    const t = useI18n();
    return (_jsx(ExportMenuItem, { onSelect: () => exportHandler('pdf'), className: className, type: "pdf", icon: _jsx(PrinterIcon, {}), label: t['com.affine.export.print']() }));
};
export const ExportMenuItems = ({ exportHandler, className = transitionStyle, pageMode = 'page', }) => {
    const t = useI18n();
    const featureFlags = useService(FeatureFlagService).flags;
    const enable_pdfmake_export = useLiveData(featureFlags.enable_pdfmake_export.$);
    return (_jsxs(_Fragment, { children: [_jsx(ExportMenuItem, { onSelect: () => exportHandler('html'), className: className, type: "html", icon: _jsx(ExportToHtmlIcon, {}), label: t['Export to HTML']() }), pageMode !== 'edgeless' && (_jsx(ExportMenuItem, { onSelect: () => exportHandler('png'), className: className, type: "png", icon: _jsx(ExportToPngIcon, {}), label: t['Export to PNG']() })), _jsx(ExportMenuItem, { onSelect: () => exportHandler('markdown'), className: className, type: "markdown", icon: _jsx(ExportToMarkdownIcon, {}), label: t['Export to Markdown']() }), pageMode !== 'edgeless' && enable_pdfmake_export && (_jsx(ExportMenuItem, { onSelect: () => exportHandler('pdf-export'), className: className, type: "pdf-export", icon: _jsx(PrinterIcon, {}), label: t['Export to PDF']() })), _jsx(ExportMenuItem, { onSelect: () => exportHandler('snapshot'), className: className, type: "snapshot", icon: _jsx(PageIcon, {}), label: t['Export to Snapshot']() })] }));
};
export const Export = ({ exportHandler, className, pageMode }) => {
    const t = useI18n();
    const items = (_jsxs(_Fragment, { children: [_jsx(ExportMenuItems, { exportHandler: exportHandler, className: className, pageMode: pageMode }), pageMode !== 'edgeless' && (_jsxs(_Fragment, { children: [_jsx(MenuSeparator, {}), _jsx(PrintMenuItems, { exportHandler: exportHandler, className: className })] }))] }));
    const handleExportMenuOpenChange = useCallback((open) => {
        if (open) {
            track.$.header.docOptions.export();
        }
    }, []);
    return (_jsx(MenuSub, { items: items, triggerOptions: {
            className: transitionStyle,
            prefixIcon: _jsx(ExportIcon, {}),
            'data-testid': 'export-menu',
        }, subOptions: {
            onOpenChange: handleExportMenuOpenChange,
        }, children: t.Export() }));
};
//# sourceMappingURL=export.js.map