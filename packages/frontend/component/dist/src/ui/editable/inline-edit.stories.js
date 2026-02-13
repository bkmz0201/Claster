import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useRef, useState } from 'react';
import { Button } from '../button';
import { ResizePanel } from '../resize-panel/resize-panel';
import { InlineEdit } from './inline-edit';
export default {
    title: 'UI/Editable/Inline Edit',
    component: InlineEdit,
};
const Template = args => {
    const [value, setValue] = useState(args.value || '');
    return (_jsxs("div", { style: { marginBottom: 40 }, children: [_jsx("div", { style: { marginBottom: 20 }, children: _jsxs("div", { style: { marginBottom: 10 }, children: [_jsx("span", { children: _jsx("b", { children: "Value: " }) }), _jsx("span", { style: {
                                padding: '2px 4px',
                                backgroundColor: 'rgba(100, 100, 100, 0.1)',
                            }, children: value })] }) }), _jsx(ResizePanel, { width: 600, height: 36, minHeight: 36, minWidth: 200, maxWidth: 1400, horizontal: true, vertical: false, style: { display: 'flex', alignItems: 'center' }, children: _jsx(InlineEdit, { style: { maxWidth: '100%' }, value: value, onChange: v => setValue(v), ...args }) })] }));
};
export const Basic = Template.bind(undefined);
Basic.args = {
    editable: true,
    placeholder: 'Untitled',
    trigger: 'doubleClick',
};
export const CustomizeText = Template.bind(undefined);
CustomizeText.args = {
    value: 'Customize Text',
    editable: true,
    placeholder: 'Untitled',
    style: {
        fontSize: 20,
        fontWeight: 500,
        padding: '10px 20px',
    },
};
export const TriggerEdit = args => {
    const ref = useRef(null);
    const triggerEdit = useCallback(() => {
        if (!ref.current)
            return;
        ref.current.triggerEdit();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("div", { style: { marginBottom: 12 }, children: _jsx(Button, { onClick: triggerEdit, children: "Edit" }) }), _jsx(ResizePanel, { width: 600, height: 36, minHeight: 36, minWidth: 200, maxWidth: 1400, horizontal: true, vertical: false, style: { display: 'flex', alignItems: 'center' }, children: _jsx(InlineEdit, { ...args, handleRef: ref }) })] }));
};
TriggerEdit.args = {
    value: 'Trigger edit mode in parent component by `handleRef`',
    editable: true,
};
export const UpdateValue = args => {
    const [value, setValue] = useState(args.value || '');
    const appendA = useCallback(() => {
        setValue(v => v + 'a');
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("div", { style: { marginBottom: 12 }, children: _jsx(Button, { onClick: appendA, children: "Append \"a\"" }) }), _jsx(ResizePanel, { width: 600, height: 36, minHeight: 36, minWidth: 200, maxWidth: 1400, horizontal: true, vertical: false, style: { display: 'flex', alignItems: 'center' }, children: _jsx(InlineEdit, { ...args, value: value, onChange: setValue }) })] }));
};
UpdateValue.args = {
    value: 'Update value in parent component by `value`',
    editable: true,
};
//# sourceMappingURL=inline-edit.stories.js.map