import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SettingHeader, SettingWrapper, } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';
import { useEdgelessShortcuts, useGeneralShortcuts, useMarkdownShortcuts, usePageShortcuts, } from '../../../../../components/hooks/affine/use-shortcuts';
import { shortcutKey, shortcutKeyContainer, shortcutRow } from './style.css';
const ShortcutsPanel = ({ shortcutsInfo, }) => {
    return (_jsx(SettingWrapper, { title: shortcutsInfo.title, children: Object.entries(shortcutsInfo.shortcuts).map(([title, shortcuts]) => {
            return (_jsxs("div", { className: shortcutRow, children: [_jsx("span", { children: title }), _jsx("div", { className: shortcutKeyContainer, children: shortcuts.map(key => {
                            return (_jsx("span", { className: shortcutKey, children: key }, key));
                        }) })] }, title));
        }) }));
};
export const Shortcuts = () => {
    const t = useI18n();
    const markdownShortcutsInfo = useMarkdownShortcuts();
    const pageShortcutsInfo = usePageShortcuts();
    const edgelessShortcutsInfo = useEdgelessShortcuts();
    const generalShortcutsInfo = useGeneralShortcuts();
    return (_jsxs(_Fragment, { children: [_jsx(SettingHeader, { title: t['com.affine.keyboardShortcuts.title'](), subtitle: t['com.affine.keyboardShortcuts.subtitle'](), "data-testid": "keyboard-shortcuts-title" }), _jsx(ShortcutsPanel, { shortcutsInfo: generalShortcutsInfo }), _jsx(ShortcutsPanel, { shortcutsInfo: pageShortcutsInfo }), _jsx(ShortcutsPanel, { shortcutsInfo: edgelessShortcutsInfo }), _jsx(ShortcutsPanel, { shortcutsInfo: markdownShortcutsInfo })] }));
};
//# sourceMappingURL=index.js.map