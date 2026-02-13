import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState, } from 'react';
import Input from '../input';
import * as styles from './inline-edit.css';
export const InlineEdit = ({ value, editable, exitible, className, style, trigger = 'doubleClick', onInput, onChange, placeholder, placeholderClassName, placeholderStyle, handleRef, inputAttrs, ...attrs }) => {
    const [editing, setEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(value);
    const inputRef = useRef(null);
    useImperativeHandle(handleRef, () => ({
        triggerEdit,
    }));
    const triggerEdit = useCallback(() => {
        if (!editable)
            return;
        setEditing(true);
    }, [editable]);
    const onDoubleClick = useCallback(() => {
        if (trigger !== 'doubleClick')
            return;
        triggerEdit();
    }, [triggerEdit, trigger]);
    const onClick = useCallback(() => {
        if (trigger !== 'click')
            return;
        triggerEdit();
    }, [triggerEdit, trigger]);
    const submit = useCallback(() => {
        onChange?.(editingValue || '');
    }, [editingValue, onChange]);
    const onEnter = useCallback(() => {
        inputRef.current?.blur();
    }, []);
    const onBlur = useCallback(() => {
        setEditing(false);
        submit();
        // to reset input's scroll position to match actual display
        inputRef.current?.scrollTo(0, 0);
    }, [submit]);
    const onKeyDown = useCallback((e) => {
        e.stopPropagation();
        if (!exitible)
            return;
        if (e.key !== 'Escape')
            return;
        inputRef.current?.blur();
    }, [exitible]);
    const inputHandler = useCallback((v) => {
        setEditingValue(v);
        onInput?.(v);
    }, [onInput]);
    // update editing value when value prop changes
    useEffect(() => {
        setEditingValue(value);
    }, [value]);
    // to make sure text is not wrapped, and multi-space is shown normally
    const displayValue = useMemo(() => {
        return editingValue ? editingValue.replace(/\n/g, '') : '';
    }, [editingValue]);
    // to make sure input's style is the same as displayed text
    const inputWrapperInheritsStyles = {
        margin: 'inherit',
        padding: 'inherit',
        borderRadius: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        textAlign: 'inherit',
        color: 'inherit',
        backgroundColor: 'inherit',
    };
    const inputInheritsStyles = {
        ...inputWrapperInheritsStyles,
        padding: 0,
        margin: 0,
    };
    return (_jsxs("div", { "data-editing": editing, className: clsx(styles.inlineEditWrapper, className), style: { ...style }, ...attrs, children: [_jsxs("div", { onClick: onClick, onDoubleClick: onDoubleClick, className: clsx(styles.inlineEdit), children: [displayValue, !displayValue && (_jsx(Placeholder, { className: placeholderClassName, label: placeholder, style: placeholderStyle }))] }), editing && (_jsx(Input, { ref: inputRef, className: styles.inlineEditInput, value: editingValue, placeholder: placeholder, onEnter: onEnter, onKeyDown: onKeyDown, onChange: inputHandler, style: inputWrapperInheritsStyles, inputStyle: inputInheritsStyles, onBlur: onBlur, autoFocus: true, autoSelect: true, ...inputAttrs }))] }));
};
const Placeholder = ({ label, children, className, style, ...attrs }) => {
    return (_jsx("div", { className: clsx(styles.placeholder, className), style: style, ...attrs, children: children ?? label }));
};
//# sourceMappingURL=inline-edit.js.map