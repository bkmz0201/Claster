import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Modal } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { IntegrationService } from '@affine/core/modules/integration';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import * as styles from './connected.css';
import { actionButton } from './index.css';
import { readwiseTrack } from './track';
export const ReadwiseDisconnectDialog = ({ onClose, }) => {
    const t = useI18n();
    const readwise = useService(IntegrationService).readwise;
    const onOpenChange = useCallback((open) => {
        if (!open)
            onClose();
    }, [onClose]);
    const handleCancel = useCallback(() => onClose(), [onClose]);
    const handleKeep = useCallback(() => {
        readwise.disconnect();
        readwiseTrack.disconnectIntegration({ method: 'keep' });
        onClose();
    }, [onClose, readwise]);
    const handleDelete = useAsyncCallback(async () => {
        await readwise.deleteAll();
        readwise.disconnect();
        readwiseTrack.disconnectIntegration({ method: 'delete' });
        onClose();
    }, [onClose, readwise]);
    return (_jsxs(Modal, { open: true, onOpenChange: onOpenChange, contentOptions: { className: styles.connectDialog }, children: [_jsx("div", { className: styles.connectDialogTitle, children: t['com.affine.integration.readwise.disconnect.title']() }), _jsx("div", { className: styles.connectDialogDesc, children: t['com.affine.integration.readwise.disconnect.desc']() }), _jsxs("footer", { className: styles.footer, children: [_jsx(Button, { onClick: handleCancel, children: t['Cancel']() }), _jsxs("div", { className: styles.actions, children: [_jsx(Button, { variant: "error", onClick: handleDelete, children: t['com.affine.integration.readwise.disconnect.delete']() }), _jsx(Button, { variant: "primary", onClick: handleKeep, children: t['com.affine.integration.readwise.disconnect.keep']() })] })] })] }));
};
export const ReadwiseDisconnectButton = () => {
    const t = useI18n();
    const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
    return (_jsxs(_Fragment, { children: [showDisconnectDialog && (_jsx(ReadwiseDisconnectDialog, { onClose: () => setShowDisconnectDialog(false) })), _jsx(Button, { variant: "error", className: actionButton, onClick: () => setShowDisconnectDialog(true), children: t['com.affine.integration.readwise.disconnect']() })] }));
};
//# sourceMappingURL=connected.js.map