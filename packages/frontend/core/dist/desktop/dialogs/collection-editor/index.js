import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from '@affine/component';
import { CollectionService, } from '@affine/core/modules/collection';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback } from 'react';
import { EditCollection } from './edit-collection';
export const CollectionEditorDialog = ({ close, collectionId, mode, }) => {
    const t = useI18n();
    const collectionService = useService(CollectionService);
    const collection = useLiveData(collectionService.collection$(collectionId));
    const onConfirmOnCollection = useCallback((collection) => {
        collectionService.updateCollection(collection.id, collection);
        close();
    }, [close, collectionService]);
    const info = useLiveData(collection?.info$);
    const onCancel = useCallback(() => {
        close();
    }, [close]);
    if (!collection || !info) {
        return null;
    }
    return (_jsx(Modal, { open: true, onOpenChange: onCancel, withoutCloseButton: true, width: "calc(100% - 64px)", height: "80%", contentOptions: {
            style: {
                padding: 0,
                maxWidth: 944,
                backgroundColor: 'var(--affine-background-primary-color)',
            },
        }, persistent: true, children: _jsx(EditCollection, { onConfirmText: t['com.affine.editCollection.save'](), init: info, mode: mode, onCancel: onCancel, onConfirm: onConfirmOnCollection }) }));
};
//# sourceMappingURL=index.js.map