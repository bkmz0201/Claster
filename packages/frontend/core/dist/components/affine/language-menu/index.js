import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Menu, MenuItem, MenuTrigger } from '@affine/component/ui/menu';
import { I18nService } from '@affine/core/modules/i18n';
import { DoneIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { memo } from 'react';
import * as styles from './style.css';
// Fixme: keyboard focus should be supported by Menu component
const LanguageMenuContent = memo(function LanguageMenuContent({ current, onChange, i18n, }) {
    return (_jsx(_Fragment, { children: i18n.languageList.map(lang => {
            const selected = current === lang.key;
            return (_jsx(MenuItem, { title: lang.name, lang: lang.key, onSelect: () => onChange(lang.key), suffix: lang.completeness + '%', "data-selected": selected, className: styles.menuItem, children: _jsxs("div", { className: styles.languageLabelWrapper, children: [_jsx("div", { children: lang.originalName }), selected && _jsx(DoneIcon, { fontSize: '16px' })] }) }, lang.name));
        }) }));
});
export const LanguageMenu = () => {
    const i18n = useService(I18nService).i18n;
    const currentLanguage = useLiveData(i18n.currentLanguage$);
    return (_jsx(Menu, { items: (_jsx(LanguageMenuContent, { current: currentLanguage.key, onChange: i18n.changeLanguage, i18n: i18n })), contentOptions: {
            className: styles.menu,
            align: 'end',
        }, children: _jsx(MenuTrigger, { "data-testid": "language-menu-button", style: { textTransform: 'capitalize', fontWeight: 600, width: '250px' }, block: true, children: currentLanguage.originalName }) }));
};
//# sourceMappingURL=index.js.map