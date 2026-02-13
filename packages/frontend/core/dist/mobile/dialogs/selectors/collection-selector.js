import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from '@affine/component';
import { CollectionService } from '@affine/core/modules/collection';
import { useI18n } from '@affine/i18n';
import { ViewLayersIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useMemo } from 'react';
import { GenericSelector } from './generic-selector';
export const CollectionSelectorDialog = ({ close, init, onBeforeConfirm, }) => {
    const t = useI18n();
    const collectionService = useService(CollectionService);
    const collections = useLiveData(collectionService.collectionMetas$);
    const list = useMemo(() => {
        return collections.map(collection => ({
            id: collection.id,
            icon: _jsx(ViewLayersIcon, {}),
            label: collection.name,
        }));
    }, [collections]);
    return (_jsx(Modal, { open: true, onOpenChange: () => close(), withoutCloseButton: true, fullScreen: true, contentOptions: {
            style: {
                background: cssVarV2('layer/background/secondary'),
                padding: 0,
            },
        }, children: _jsx(GenericSelector, { onBack: close, onConfirm: close, onBeforeConfirm: onBeforeConfirm, initial: init, data: list, typeName: t[`com.affine.m.selector.type-collection`]() }) }));
};
//# sourceMappingURL=collection-selector.js.map