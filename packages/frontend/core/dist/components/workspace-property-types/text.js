import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, PropertyValue } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { TextIcon, TextTypeIcon } from '@blocksuite/icons/rc';
import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useEffect, useRef, useState, } from 'react';
import { PlainTextDocGroupHeader } from '../explorer/docs-view/group-header';
import { StackProperty } from '../explorer/docs-view/stack-property';
import { FilterValueMenu } from '../filter/filter-value-menu';
import { ConfigModal } from '../mobile';
import * as styles from './text.css';
const DesktopTextValue = ({ value, onChange, readonly, }) => {
    const [tempValue, setTempValue] = useState(value);
    const handleClick = useCallback((e) => {
        e.stopPropagation();
    }, []);
    const ref = useRef(null);
    const handleBlur = useCallback((e) => {
        onChange(e.currentTarget.value.trim());
    }, [onChange]);
    // use native blur event to get event after unmount
    // don't use useLayoutEffect here, cause the cleanup function will be called before unmount
    useEffect(() => {
        ref.current?.addEventListener('blur', handleBlur);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ref.current?.removeEventListener('blur', handleBlur);
        };
    }, [handleBlur]);
    const handleOnChange = useCallback(e => {
        setTempValue(e.target.value);
    }, []);
    const t = useI18n();
    useEffect(() => {
        setTempValue(value);
    }, [value]);
    return (_jsxs(PropertyValue, { className: styles.textPropertyValueContainer, onClick: handleClick, isEmpty: !value, readonly: readonly, children: [_jsx("textarea", { ref: ref, className: styles.textarea, value: tempValue || '', onChange: handleOnChange, onClick: handleClick, "data-empty": !tempValue, autoFocus: false, placeholder: t['com.affine.page-properties.property-value-placeholder'](), disabled: readonly }), _jsxs("div", { className: styles.textInvisible, children: [tempValue, tempValue?.endsWith('\n') || !tempValue ? _jsx("br", {}) : null] })] }));
};
const MobileTextValue = ({ value, onChange, propertyInfo, }) => {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value || '');
    const handleClick = useCallback((e) => {
        e.stopPropagation();
        setOpen(true);
    }, []);
    const ref = useRef(null);
    const handleBlur = useCallback((e) => {
        onChange(e.currentTarget.value.trim());
    }, [onChange]);
    // use native blur event to get event after unmount
    // don't use useLayoutEffect here, cause the cleanup function will be called before unmount
    useEffect(() => {
        ref.current?.addEventListener('blur', handleBlur);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            ref.current?.removeEventListener('blur', handleBlur);
        };
    }, [handleBlur]);
    const handleOnChange = useCallback(e => {
        setTempValue(e.target.value);
    }, []);
    const onClose = useCallback(() => {
        setOpen(false);
        onChange(tempValue.trim());
    }, [onChange, tempValue]);
    const t = useI18n();
    useEffect(() => {
        setTempValue(value || '');
    }, [value]);
    return (_jsxs(_Fragment, { children: [_jsx(PropertyValue, { className: styles.textPropertyValueContainer, onClick: handleClick, isEmpty: !value, children: _jsx("div", { className: styles.mobileTextareaPlain, "data-empty": !tempValue, children: tempValue ||
                        t['com.affine.page-properties.property-value-placeholder']() }) }), _jsx(ConfigModal, { open: open, onOpenChange: setOpen, onBack: onClose, title: _jsxs(_Fragment, { children: [_jsx(TextIcon, {}), propertyInfo?.name] }), children: _jsxs("div", { className: styles.mobileTextareaWrapper, children: [_jsx("textarea", { ref: ref, className: styles.mobileTextarea, value: tempValue || '', onChange: handleOnChange, "data-empty": !tempValue, autoFocus: true, placeholder: t['com.affine.page-properties.property-value-placeholder']() }), _jsxs("div", { className: styles.mobileTextInvisible, children: [tempValue, tempValue?.endsWith('\n') || !tempValue ? _jsx("br", {}) : null] })] }) })] }));
};
export const TextValue = BUILD_CONFIG.isMobileWeb
    ? MobileTextValue
    : DesktopTextValue;
export const TextFilterValue = ({ filter, isDraft, onDraftCompleted, onChange, }) => {
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
    return filter.method !== 'is-not-empty' && filter.method !== 'is-empty' ? (_jsx(FilterValueMenu, { isDraft: isDraft, rootOptions: {
            open: valueMenuOpen,
            onOpenChange: setValueMenuOpen,
            onClose: onDraftCompleted,
        }, contentOptions: {
            onPointerDownOutside: submitTempValue,
        }, items: _jsx(Input, { inputStyle: {
                fontSize: cssVar('fontBase'),
            }, autoFocus: true, autoSelect: true, value: tempValue, onChange: value => {
                setTempValue(value);
            }, onEnter: handleInputEnter, onKeyDown: handleInputKeyDown, style: { height: 34, borderRadius: 4 } }), children: filter.value ? (_jsx("span", { children: filter.value })) : (_jsx("span", { style: { color: cssVarV2('text/placeholder') }, children: t['com.affine.filter.empty']() })) })) : null;
};
export const TextDocListProperty = ({ value }) => {
    if (!value) {
        return null;
    }
    return _jsx(StackProperty, { icon: _jsx(TextTypeIcon, {}), children: value });
};
export const TextGroupHeader = ({ groupId, docCount }) => {
    const text = groupId || 'No Text';
    return (_jsx(PlainTextDocGroupHeader, { groupId: groupId, docCount: docCount, children: text }));
};
//# sourceMappingURL=text.js.map