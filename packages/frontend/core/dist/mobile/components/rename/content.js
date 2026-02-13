import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, RowInput } from '@affine/component';
import { useI18n } from '@affine/i18n';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import * as styles from './content.css';
export const RenameContent = ({ initialName = '', inputProps, confirmButtonProps, inputPrefixRenderer: InputPrefixRenderer, inputBelowRenderer: InputBelowRenderer, descRenderer: DescRenderer, confirmText = 'Done', onConfirm, }) => {
    const t = useI18n();
    const [value, setValue] = useState(initialName);
    const { className: inputClassName, ...restInputProps } = inputProps ?? {};
    const { className: confirmButtonClassName, ...restConfirmButtonProps } = confirmButtonProps ?? {};
    const handleDone = useCallback(() => {
        onConfirm?.(value);
    }, [onConfirm, value]);
    return (_jsxs("div", { children: [_jsxs("div", { className: styles.inputWrapper, children: [InputPrefixRenderer ? _jsx(InputPrefixRenderer, { input: value }) : null, _jsx(RowInput, { autoFocus: true, className: clsx(styles.input, inputClassName), value: value, onChange: setValue, "data-testid": "rename-input", ...restInputProps })] }), InputBelowRenderer ? _jsx(InputBelowRenderer, { input: value }) : null, _jsx("div", { className: styles.desc, children: DescRenderer ? (_jsx(DescRenderer, { input: value })) : (t['com.affine.m.rename-to']({ name: value })) }), _jsx("div", { className: styles.doneWrapper, children: _jsx(Button, { className: clsx(styles.done, confirmButtonClassName), onClick: handleDone, disabled: !value, variant: "primary", size: "extraLarge", "data-testid": "rename-confirm", ...restConfirmButtonProps, children: confirmText }) })] }));
};
//# sourceMappingURL=content.js.map