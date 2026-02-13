import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@affine/admin/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@affine/admin/components/ui/select';
import { Switch } from '@affine/admin/components/ui/switch';
import { useCallback } from 'react';
import { Textarea } from '../../components/ui/textarea';
const Inputs = {
    Boolean: function SwitchInput({ defaultValue, onChange }) {
        const handleSwitchChange = (checked) => {
            onChange(checked);
        };
        return (_jsx(Switch, { defaultChecked: defaultValue, onCheckedChange: handleSwitchChange }));
    },
    String: function StringInput({ defaultValue, onChange }) {
        const handleInputChange = (e) => {
            onChange(e.target.value);
        };
        return (_jsx(Input, { type: "text", minLength: 1, defaultValue: defaultValue, onChange: handleInputChange }));
    },
    Number: function NumberInput({ defaultValue, onChange }) {
        const handleInputChange = (e) => {
            onChange(parseInt(e.target.value));
        };
        return (_jsx(Input, { type: "number", defaultValue: defaultValue, onChange: handleInputChange }));
    },
    JSON: function ObjectInput({ defaultValue, onChange }) {
        const handleInputChange = (e) => {
            try {
                const value = JSON.parse(e.target.value);
                onChange(value);
            }
            catch { }
        };
        return (_jsx(Textarea, { defaultValue: JSON.stringify(defaultValue), onChange: handleInputChange, className: "w-full" }));
    },
    Enum: function EnumInput({ defaultValue, onChange, options }) {
        return (_jsxs(Select, { defaultValue: defaultValue, onValueChange: onChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select an option" }) }), _jsx(SelectContent, { children: options?.map(option => (_jsx(SelectItem, { value: option, children: option }, option))) })] }));
    },
};
export const ConfigRow = ({ field, desc, type, defaultValue, onChange, error, ...props }) => {
    const Input = Inputs[type] ?? Inputs.JSON;
    const onValueChange = useCallback((value) => {
        onChange(field, value);
    }, [field, onChange]);
    return (_jsxs("div", { className: `flex justify-between flex-grow space-y-[10px]
         ${type === 'Boolean' ? 'flex-row' : 'flex-col'}`, children: [_jsx("div", { className: "text-base font-bold flex-3", dangerouslySetInnerHTML: { __html: desc } }), _jsxs("div", { className: "flex flex-col items-end relative flex-1", children: [_jsx(Input, { defaultValue: defaultValue, onChange: onValueChange, error: error, ...props }), error && (_jsx("div", { className: "absolute bottom-[-25px] text-sm right-0 break-words text-red-500", children: error }))] })] }));
};
//# sourceMappingURL=config-input-row.js.map