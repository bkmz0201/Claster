import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, RadioGroup } from '@affine/component';
import { SelectPage } from '@affine/core/components/page-list/docs/select-page';
import { useI18n } from '@affine/i18n';
import { useCallback, useMemo, useState } from 'react';
import * as styles from './edit-collection.css';
import { RulesMode } from './rules-mode';
export const EditCollection = ({ init, onConfirm, onCancel, onConfirmText, mode: initMode, }) => {
    const t = useI18n();
    const [value, onChange] = useState(init);
    const [mode, setMode] = useState(initMode ?? (init.rules.filters.length === 0 ? 'page' : 'rule'));
    const isNameEmpty = useMemo(() => value.name.trim().length === 0, [value]);
    const onSaveCollection = useCallback(() => {
        if (!isNameEmpty) {
            onConfirm(value);
        }
    }, [value, isNameEmpty, onConfirm]);
    const reset = useCallback(() => {
        onChange({
            ...value,
            rules: init.rules,
            allowList: init.allowList,
        });
    }, [init, value]);
    const onIdsChange = useCallback((ids) => {
        onChange(prev => ({ ...prev, allowList: ids }));
    }, []);
    const buttons = useMemo(() => (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: onCancel, className: styles.actionButton, children: t['com.affine.editCollection.button.cancel']() }), _jsx(Button, { className: styles.actionButton, "data-testid": "save-collection", variant: "primary", disabled: isNameEmpty, onClick: onSaveCollection, children: onConfirmText ?? t['com.affine.editCollection.button.create']() })] })), [onCancel, t, isNameEmpty, onSaveCollection, onConfirmText]);
    const switchMode = useMemo(() => (_jsx(RadioGroup, { style: { minWidth: 158 }, value: mode, onChange: setMode, items: [
            {
                value: 'page',
                label: t['com.affine.editCollection.pages'](),
                testId: 'edit-collection-pages-button',
            },
            {
                value: 'rule',
                label: t['com.affine.editCollection.rules'](),
                testId: 'edit-collection-rules-button',
            },
        ] }, "mode-switcher")), [mode, t]);
    return (_jsx("div", { onKeyDown: e => {
            if (e.key === 'Escape') {
                return;
            }
            e.stopPropagation();
        }, className: styles.collectionEditContainer, children: mode === 'page' ? (_jsx(SelectPage, { init: init.allowList, onChange: onIdsChange, header: switchMode, buttons: buttons })) : (_jsx(RulesMode, { collection: value, switchMode: switchMode, reset: reset, updateCollection: onChange, buttons: buttons })) }));
};
//# sourceMappingURL=edit-collection.js.map