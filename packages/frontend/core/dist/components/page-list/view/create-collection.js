import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input, Modal } from '@affine/component';
import { useCatchEventCallback } from '@affine/core/components/hooks/use-catch-event-hook';
import { useI18n } from '@affine/i18n';
import { useCallback, useMemo, useState } from 'react';
import * as styles from './create-collection.css';
export const CreateCollectionModal = ({ init, onConfirm, open, showTips, onOpenChange, title, }) => {
    const t = useI18n();
    const onConfirmTitle = useCallback((title) => {
        onConfirm(title);
        onOpenChange(false);
    }, [onConfirm, onOpenChange]);
    const onCancel = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);
    return (_jsx(Modal, { open: open, title: title, onOpenChange: onOpenChange, width: 480, children: init != null ? (_jsx(CreateCollection, { showTips: showTips, onConfirmText: t['com.affine.editCollection.save'](), init: init, onConfirm: onConfirmTitle, onCancel: onCancel })) : null }));
};
export const CreateCollection = ({ onConfirmText, init, showTips, onCancel, onConfirm, }) => {
    const t = useI18n();
    const [value, onChange] = useState(init);
    const isNameEmpty = useMemo(() => value.trim().length === 0, [value]);
    const save = useCallback(() => {
        if (isNameEmpty) {
            return;
        }
        onConfirm(value);
    }, [onConfirm, value, isNameEmpty]);
    const onKeyDown = useCatchEventCallback((e) => {
        if (e.key === 'Escape') {
            if (isNameEmpty) {
                return;
            }
            else {
                e.currentTarget.blur();
            }
        }
    }, [isNameEmpty]);
    return (_jsxs("div", { "data-testid": "edit-collection-modal", children: [_jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.label, children: t['com.affine.editCollectionName.name']() }), _jsx(Input, { autoFocus: true, value: value, "data-testid": "input-collection-title", placeholder: t['com.affine.editCollectionName.name.placeholder'](), onChange: useCallback((value) => onChange(value), [onChange]), onEnter: save, onKeyDown: onKeyDown }), showTips ? (_jsx("div", { className: styles.createTips, children: t['com.affine.editCollectionName.createTips']() })) : null] }), _jsxs("div", { className: styles.footer, children: [_jsx(Button, { size: "large", onClick: onCancel, children: t['com.affine.editCollection.button.cancel']() }), _jsx(Button, { size: "large", "data-testid": "save-collection", variant: "primary", disabled: isNameEmpty, onClick: save, children: onConfirmText ?? t['com.affine.editCollection.button.create']() })] })] }));
};
//# sourceMappingURL=create-collection.js.map