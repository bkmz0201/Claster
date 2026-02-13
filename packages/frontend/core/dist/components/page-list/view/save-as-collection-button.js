import { jsx as _jsx } from "react/jsx-runtime";
import { Button, usePromptModal } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { SaveIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';
import * as styles from './save-as-collection-button.css';
export const SaveAsCollectionButton = ({ onConfirm, }) => {
    const t = useI18n();
    const { openPromptModal } = usePromptModal();
    const handleClick = useCallback(() => {
        openPromptModal({
            title: t['com.affine.editCollection.saveCollection'](),
            label: t['com.affine.editCollectionName.name'](),
            inputOptions: {
                placeholder: t['com.affine.editCollectionName.name.placeholder'](),
            },
            children: (_jsx("div", { className: styles.createTips, children: t['com.affine.editCollectionName.createTips']() })),
            confirmText: t['com.affine.editCollection.save'](),
            cancelText: t['com.affine.editCollection.button.cancel'](),
            confirmButtonOptions: {
                variant: 'primary',
            },
            onConfirm(name) {
                onConfirm(name);
            },
        });
    }, [openPromptModal, t, onConfirm]);
    return (_jsx(Button, { onClick: handleClick, "data-testid": "save-as-collection", prefix: _jsx(SaveIcon, {}), className: styles.button, children: t['com.affine.editCollection.saveCollection']() }));
};
//# sourceMappingURL=save-as-collection-button.js.map