import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loading, Tooltip, useConfirmModal } from '@affine/component';
import { Pagination } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';
import { getAttachmentFileIconRC } from '@blocksuite/affine/components/icons';
import { cssVarV2 } from '@blocksuite/affine/shared/theme';
import { CloseIcon, WarningIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback } from 'react';
import { COUNT_PER_PAGE } from '../constants';
import { getAttachmentId, isErrorAttachment, isPersistedAttachment, isUploadingAttachment, } from '../utils';
import { attachmentError, attachmentItem, attachmentOperation, attachmentsWrapper, attachmentTitle, } from './styles-css';
const UploadingItem = ({ attachment, }) => {
    return (_jsxs("div", { className: attachmentTitle, "data-testid": "workspace-embedding-setting-attachment-uploading-item", children: [_jsx(Loading, {}), attachment.fileName] }));
};
const ErrorItem = ({ attachment, }) => {
    return (_jsx(Tooltip, { content: attachment.errorMessage, children: _jsxs("div", { className: attachmentTitle, "data-testid": "workspace-embedding-setting-attachment-error-item", children: [_jsx(WarningIcon, {}), attachment.fileName] }) }));
};
const PersistedItem = ({ attachment, }) => {
    const Icon = getAttachmentFileIconRC(attachment.mimeType);
    return (_jsxs("div", { className: attachmentTitle, "data-testid": "workspace-embedding-setting-attachment-persisted-item", children: [_jsx(Icon, { style: { marginRight: 4 } }), _jsx("span", { className: "attachment-title-text", children: attachment.fileName })] }));
};
const AttachmentItem = ({ attachment, onDelete, disabled, }) => {
    const t = useI18n();
    const { openConfirmModal } = useConfirmModal();
    const handleDelete = useCallback(() => {
        if (isErrorAttachment(attachment)) {
            onDelete(getAttachmentId(attachment));
            return;
        }
        openConfirmModal({
            title: t['com.affine.settings.workspace.indexer-embedding.embedding.additional-attachments.remove-attachment.title'](),
            description: t['com.affine.settings.workspace.indexer-embedding.embedding.additional-attachments.remove-attachment.description'](),
            confirmText: t['Confirm'](),
            confirmButtonOptions: {
                variant: 'error',
            },
            onConfirm: () => {
                onDelete(getAttachmentId(attachment));
            },
        });
    }, [onDelete, attachment, openConfirmModal, t]);
    return (_jsxs("div", { className: clsx(attachmentItem, {
            [attachmentError]: isErrorAttachment(attachment),
        }), "data-testid": "workspace-embedding-setting-attachment-item", children: [isUploadingAttachment(attachment) ? (_jsx(UploadingItem, { attachment: attachment })) : isErrorAttachment(attachment) ? (_jsx(ErrorItem, { attachment: attachment })) : isPersistedAttachment(attachment) ? (_jsx(PersistedItem, { attachment: attachment })) : null, !disabled && (_jsx("div", { className: attachmentOperation, children: _jsx(Tooltip, { content: t['com.affine.settings.workspace.indexer-embedding.embedding.additional-attachments.remove-attachment.tooltip'](), children: _jsx(CloseIcon, { "data-testid": "workspace-embedding-setting-attachment-delete-button", onClick: handleDelete, color: cssVarV2('icon/primary'), style: { cursor: 'pointer' } }) }) }))] }));
};
export const Attachments = ({ attachments, totalCount, onDelete, onPageChange, disabled, }) => {
    const handlePageChange = useCallback((offset) => {
        onPageChange(offset);
    }, [onPageChange]);
    return (_jsxs("div", { className: attachmentsWrapper, "data-testid": "workspace-embedding-setting-attachment-list", children: [attachments.map(attachment => (_jsx(AttachmentItem, { attachment: attachment, onDelete: onDelete, disabled: disabled }, getAttachmentId(attachment)))), _jsx(Pagination, { totalCount: totalCount, countPerPage: COUNT_PER_PAGE, onPageChange: handlePageChange })] }));
};
//# sourceMappingURL=attachments.js.map