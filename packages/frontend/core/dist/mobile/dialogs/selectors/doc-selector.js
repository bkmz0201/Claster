import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from '@affine/component';
import { DocsService } from '@affine/core/modules/doc';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useMemo } from 'react';
import { GenericSelector } from './generic-selector';
const DocIcon = ({ docId }) => {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const Icon = useLiveData(docDisplayMetaService.icon$(docId));
    return _jsx(Icon, {});
};
const DocLabel = ({ docId }) => {
    const docDisplayMetaService = useService(DocDisplayMetaService);
    const label = useLiveData(docDisplayMetaService.title$(docId));
    return label;
};
export const DocSelectorDialog = ({ close, init, onBeforeConfirm, }) => {
    const t = useI18n();
    const docsService = useService(DocsService);
    const docRecords = useLiveData(docsService.list.docs$);
    const list = useMemo(() => {
        return (docRecords
            ?.filter(record => !record.trash$.value) // not reactive
            ?.map(record => ({
            id: record.id,
            icon: _jsx(DocIcon, { docId: record.id }),
            label: _jsx(DocLabel, { docId: record.id }),
        })) ?? []);
    }, [docRecords]);
    return (_jsx(Modal, { open: true, onOpenChange: () => close(), withoutCloseButton: true, fullScreen: true, contentOptions: {
            style: {
                background: cssVarV2('layer/background/secondary'),
                padding: 0,
            },
        }, children: _jsx(GenericSelector, { onBack: close, onConfirm: close, onBeforeConfirm: onBeforeConfirm, initial: init, data: list, typeName: t[`com.affine.m.selector.type-doc`]() }) }));
};
//# sourceMappingURL=doc-selector.js.map