import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from '@affine/component';
import { SelectPage } from '@affine/core/components/page-list/docs/select-page';
import { cssVar } from '@toeverything/theme';
export const DocSelectorDialog = ({ close, init: selectedDocIds, }) => {
    return (_jsx(Modal, { open: true, onOpenChange: () => close(), withoutCloseButton: true, width: "calc(100% - 32px)", height: "80%", contentOptions: {
            style: {
                padding: 0,
                maxWidth: 976,
                background: cssVar('backgroundPrimaryColor'),
            },
        }, children: _jsx(SelectPage, { init: selectedDocIds, onCancel: () => close(), onConfirm: value => close(value) }) }));
};
//# sourceMappingURL=doc.js.map