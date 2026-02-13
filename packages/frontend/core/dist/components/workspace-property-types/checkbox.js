import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, MenuItem, PropertyValue } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { CheckBoxCheckLinearIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import * as styles from './checkbox.css';
export const CheckboxValue = ({ value, onChange, readonly, }) => {
    const parsedValue = value === 'true' ? true : false;
    const handleClick = useCallback((e) => {
        e.stopPropagation();
        if (readonly) {
            return;
        }
        onChange(parsedValue ? 'false' : 'true');
    }, [onChange, parsedValue, readonly]);
    return (_jsx(PropertyValue, { onClick: handleClick, className: styles.container, children: _jsx(Checkbox, { className: styles.checkboxProperty, checked: parsedValue, onChange: () => { }, disabled: readonly }) }));
};
export const CheckboxFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    return (_jsx(FilterValueMenu, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: _jsxs(_Fragment, { children: [_jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'true',
                        });
                    }, selected: filter.value === 'true', children: 'True' }), _jsx(MenuItem, { onClick: () => {
                        onChange?.({
                            ...filter,
                            value: 'false',
                        });
                    }, selected: filter.value !== 'true', children: 'False' })] }), children: _jsx("span", { children: filter.value === 'true' ? 'True' : 'False' }) }));
};
export const CheckboxDocListProperty = ({ value, propertyInfo, }) => {
    const t = useI18n();
    if (!value)
        return null;
    return (_jsx(StackProperty, { icon: _jsx(CheckBoxCheckLinearIcon, {}), children: propertyInfo.name || t['unnamed']() }));
};
export const CheckboxGroupHeader = ({ groupId, docCount, }) => {
    const t = useI18n();
    const text = groupId === 'true'
        ? t['com.affine.all-docs.group.is-checked']()
        : t['com.affine.all-docs.group.is-not-checked']();
    return (_jsx(PlainTextDocGroupHeader, { docCount: docCount, groupId: groupId, children: text }));
};
//# sourceMappingURL=checkbox.js.map