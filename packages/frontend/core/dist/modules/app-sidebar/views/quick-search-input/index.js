import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from '@affine/i18n';
import { SearchIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import * as styles from './index.css';
// Although it is called an input, it is actually a button.
export function QuickSearchInput({ onClick, ...props }) {
    const t = useI18n();
    return (_jsxs("div", { ...props, className: clsx([props.className, styles.root]), onClick: onClick, tabIndex: 0, children: [_jsx(SearchIcon, { className: styles.icon }), _jsx("span", { className: styles.quickSearchBarEllipsisStyle, children: t['Quick search']() })] }));
}
//# sourceMappingURL=index.js.map