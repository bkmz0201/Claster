import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Checkbox } from './checkbox';
export default {
    title: 'UI/Checkbox',
    component: Checkbox,
    parameters: {
        chromatic: { disableSnapshot: true },
    },
};
export const Basic = props => {
    const [checked, setChecked] = useState(props.checked);
    const handleChange = (_event, checked) => {
        setChecked(checked);
        props.onChange?.(_event, checked);
    };
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
        }, children: [_jsx(Checkbox, { style: { fontSize: 14 }, ...props, checked: checked, onChange: handleChange }), _jsx(Checkbox, { style: { fontSize: 16 }, ...props, checked: checked, onChange: handleChange }), _jsx(Checkbox, { style: { fontSize: 18 }, ...props, checked: checked, onChange: handleChange }), _jsx(Checkbox, { style: { fontSize: 24 }, ...props, checked: checked, onChange: handleChange })] }));
};
Basic.args = {
    checked: true,
    disabled: false,
    indeterminate: false,
    onChange: console.log,
};
//# sourceMappingURL=checkbox.stories.js.map