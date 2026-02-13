import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@affine/component/ui/button';
import { useI18n } from '@affine/i18n';
import { useRef } from 'react';
export const Upload = ({ fileChange, accept, children, disabled, ...props }) => {
    const t = useI18n();
    const input_ref = useRef(null);
    const _chooseFile = () => {
        if (input_ref.current) {
            input_ref.current.click();
        }
    };
    const _handleInputChange = (e) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        const file = files[0];
        fileChange(file);
        if (input_ref.current) {
            input_ref.current.value = '';
        }
    };
    if (disabled) {
        return children ?? _jsx(Button, { children: t['Upload']() });
    }
    return (_jsxs("div", { style: { display: 'flex' }, onClick: _chooseFile, children: [children ?? _jsx(Button, { children: t['Upload']() }), _jsx("input", { ref: input_ref, type: "file", style: { display: 'none' }, onChange: _handleInputChange, accept: accept, ...props })] }));
};
//# sourceMappingURL=index.js.map