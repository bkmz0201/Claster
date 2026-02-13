import { jsx as _jsx } from "react/jsx-runtime";
import { DatePicker, Menu, PropertyValue, } from '@affine/component';
import { i18nTime, useI18n } from '@affine/i18n';
import { DateTimeIcon } from '@blocksuite/icons/rc';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import { FilterOptionsGroup } from '../filter/options';
import * as styles from './date.css';
const useParsedDate = (value) => {
    const parsedValue = typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)
        ? value
        : undefined;
    const displayValue = parsedValue
        ? i18nTime(parsedValue, { absolute: { accuracy: 'day' } })
        : undefined;
    const t = useI18n();
    return {
        parsedValue,
        displayValue: displayValue ??
            t['com.affine.page-properties.property-value-placeholder'](),
    };
};
export const DateValue = ({ value, onChange, readonly, }) => {
    const { parsedValue, displayValue } = useParsedDate(value);
    if (readonly) {
        return (_jsx(PropertyValue, { className: parsedValue ? '' : styles.empty, isEmpty: !parsedValue, readonly: true, children: displayValue }));
    }
    return (_jsx(Menu, { contentOptions: {
            style: BUILD_CONFIG.isMobileEdition ? { padding: '15px 20px' } : {},
        }, items: _jsx(DatePicker, { value: parsedValue, onChange: onChange }), children: _jsx(PropertyValue, { className: parsedValue ? '' : styles.empty, isEmpty: !parsedValue, children: displayValue }) }));
};
const DateSelectorMenu = ({ ref, value, onChange, onClose, }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => ({
        changeOpen: (open) => {
            setOpen(open);
            if (!open) {
                onClose?.();
            }
        },
    }), [onClose]);
    const handleOpenChange = useCallback((open) => {
        setOpen(open);
        if (!open) {
            onClose?.();
        }
    }, [onClose]);
    const handleChange = useCallback((value) => {
        onChange(value);
        setOpen(false);
        onClose?.();
    }, [onChange, onClose]);
    return (_jsx(FilterValueMenu, { rootOptions: {
            open,
            onOpenChange: handleOpenChange,
        }, contentOptions: {
            style: { padding: '12px 16px' },
        }, items: _jsx(DatePicker, { value: value || undefined, onChange: handleChange }), children: value ? (_jsx("span", { children: value })) : (_jsx("span", { style: { color: cssVarV2('text/placeholder') }, children: t['com.affine.filter.empty']() })) }));
};
const DateFilterValueAfterBefore = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const menuRef = useRef(null);
    const value = filter.value;
    const values = value?.split(',') ?? [];
    const handleChange = useCallback((date) => {
        onChange?.({
            ...filter,
            value: date,
        });
    }, [onChange, filter]);
    useEffect(() => {
        if (isDraft) {
            menuRef.current?.changeOpen(true);
        }
    }, [isDraft]);
    return (_jsx(DateSelectorMenu, { ref: menuRef, value: values[0], onChange: handleChange, onClose: onDraftCompleted }));
};
export const DateFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
    const value = filter.value;
    const values = value?.split(',') ?? [];
    const handleChange = useCallback((date) => {
        onChange?.({
            ...filter,
            value: date,
        });
    }, [onChange, filter]);
    useEffect(() => {
        if (isDraft &&
            filter.method !== 'after' &&
            filter.method !== 'before' &&
            filter.method !== 'between') {
            onDraftCompleted?.();
        }
    }, [isDraft, filter.method, onDraftCompleted]);
    return filter.method === 'after' || filter.method === 'before' ? (_jsx(DateFilterValueAfterBefore, { filter: filter, isDraft: isDraft, onDraftCompleted: onDraftCompleted, onChange: onChange })) : filter.method === 'between' ? (_jsx(FilterOptionsGroup, { isDraft: isDraft, onDraftCompleted: onDraftCompleted, items: [
            ({ onDraftCompleted, menuRef }) => (_jsx(DateSelectorMenu, { ref: menuRef, value: values[0], onChange: value => handleChange(`${value},${values[1] || ''}`), onClose: onDraftCompleted })),
            _jsx("span", { style: { color: cssVarV2('text/placeholder') }, children: "\u00A0-\u00A0" }, "between"),
            ({ onDraftCompleted, menuRef }) => (_jsx(DateSelectorMenu, { ref: menuRef, value: values[1], onChange: value => handleChange(`${values[0] || ''},${value}`), onClose: onDraftCompleted })),
        ] })) : undefined;
};
export const DateDocListProperty = ({ value }) => {
    if (!value)
        return null;
    return (_jsx(StackProperty, { icon: _jsx(DateTimeIcon, {}), children: i18nTime(value, { absolute: { accuracy: 'day' } }) }));
};
export const DateGroupHeader = ({ groupId, docCount }) => {
    const date = groupId || 'No Date';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: date }));
};
//# sourceMappingURL=date.js.map