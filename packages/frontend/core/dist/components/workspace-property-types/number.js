import { jsx as _jsx } from "react/jsx-runtime";
import { Input, PropertyValue } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { NumberIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useEffect, useState, } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import * as styles from './number.css';
export const NumberValue = ({ value, onChange, readonly, }) => {
    const parsedValue = isNaN(Number(value)) ? null : value;
    const [tempValue, setTempValue] = useState(parsedValue);
    const handleBlur = useCallback((e) => {
        onChange(e.target.value.trim());
    }, [onChange]);
    const handleOnChange = useCallback(e => {
        setTempValue(e.target.value.trim());
    }, []);
    const t = useI18n();
    useEffect(() => {
        setTempValue(parsedValue);
    }, [parsedValue]);
    return (_jsx(PropertyValue, { className: styles.numberPropertyValueContainer, isEmpty: !parsedValue, readonly: readonly, children: _jsx("input", { className: styles.numberPropertyValueInput, type: "number", inputMode: "decimal", value: tempValue || '', onChange: handleOnChange, onBlur: handleBlur, "data-empty": !tempValue, placeholder: t['com.affine.page-properties.property-value-placeholder'](), disabled: readonly }) }));
};
export const NumberFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const [tempValue, setTempValue] = useState(filter.value || '');
    const [valueMenuOpen, setValueMenuOpen] = useState(false);
    const t = useI18n();
    useEffect(() => {
        // update temp value with new filter value
        setTempValue(filter.value || '');
    }, [filter.value]);
    const submitTempValue = useCallback(() => {
        if (tempValue !== (filter.value || '')) {
            onChange?.({
                ...filter,
                value: tempValue,
            });
        }
    }, [filter, onChange, tempValue]);
    const handleInputKeyDown = useCallback((e) => {
        if (e.key !== 'Escape')
            return;
        submitTempValue();
        setValueMenuOpen(false);
        onDraftCompleted?.();
    }, [submitTempValue, onDraftCompleted]);
    const handleInputEnter = useCallback(() => {
        submitTempValue();
        setValueMenuOpen(false);
        onDraftCompleted?.();
    }, [submitTempValue, onDraftCompleted]);
    useEffect(() => {
        if (isDraft &&
            (filter.method === 'is-not-empty' || filter.method === 'is-empty')) {
            onDraftCompleted?.();
        }
    }, [isDraft, filter.method, onDraftCompleted]);
    return filter.method !== 'is-not-empty' && filter.method !== 'is-empty' ? (_jsx(FilterValueMenu, { rootOptions: {
            open: valueMenuOpen,
            onOpenChange: setValueMenuOpen,
            onClose: onDraftCompleted,
        }, contentOptions: {
            onPointerDownOutside: submitTempValue,
        }, items: _jsx(Input, { inputStyle: {
                fontSize: cssVar('fontBase'),
            }, type: "number", inputMode: "decimal", autoFocus: true, autoSelect: true, value: tempValue, onChange: value => {
                setTempValue(value);
            }, onEnter: handleInputEnter, onKeyDown: handleInputKeyDown, style: { height: 34, borderRadius: 4 } }), children: filter.value ? (_jsx("span", { children: filter.value })) : (_jsx("span", { style: { color: cssVarV2('text/placeholder') }, children: t['com.affine.filter.empty']() })) })) : null;
};
export const NumberDocListProperty = ({ value }) => {
    if (value !== 0 && !value) {
        return null;
    }
    return _jsx(StackProperty, { icon: _jsx(NumberIcon, {}), children: value });
};
export const NumberGroupHeader = ({ groupId, docCount }) => {
    const t = useI18n();
    const number = groupId || t['com.affine.filter.empty']();
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: number }));
};
//# sourceMappingURL=number.js.map