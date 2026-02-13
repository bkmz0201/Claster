import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, RowInput } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { useCallback } from 'react';
import * as styles from './selector-layout.css';
/**
 * Provides a unified layout for doc/collection/tag selector
 * - Header (Search input)
 * - Content
 * - Footer (Selected count + Actions)
 */
export const SelectorLayout = ({ children, searchPlaceholder, selectedCount, onSearch, onClear, onCancel, onConfirm, actions, }) => {
    const t = useI18n();
    const onSearchChange = useCallback((value) => {
        onSearch?.(value);
    }, [onSearch]);
    return (_jsxs("div", { className: styles.root, "data-testid": "doc-selector-layout", children: [_jsx("header", { className: styles.header, children: _jsx(RowInput, { "data-testid": "doc-selector-search-input", className: styles.search, placeholder: searchPlaceholder, onChange: onSearchChange, debounce: 200 }) }), _jsx("main", { className: styles.content, children: children }), _jsxs("footer", { className: styles.footer, children: [_jsxs("div", { className: styles.footerInfo, children: [_jsxs("div", { className: styles.selectedCount, children: [_jsx("span", { children: t['com.affine.selectPage.selected']() }), _jsx("span", { className: styles.selectedNum, children: selectedCount ?? 0 })] }), _jsx(Button, { variant: "plain", className: styles.clearButton, onClick: onClear, children: t['com.affine.editCollection.pages.clear']() })] }), _jsx("div", { className: styles.footerAction, children: actions ?? (_jsxs(_Fragment, { children: [_jsx(Button, { "data-testid": "doc-selector-cancel-button", onClick: onCancel, className: styles.actionButton, children: t['Cancel']() }), _jsx(Button, { "data-testid": "doc-selector-confirm-button", onClick: onConfirm, className: styles.actionButton, variant: "primary", children: t['Confirm']() })] })) })] })] }));
};
//# sourceMappingURL=selector-layout.js.map