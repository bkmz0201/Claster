import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Input, Modal, notify, } from '@affine/component';
import { useAsyncCallback } from '@affine/core/components/hooks/affine-async-hooks';
import { IntegrationService } from '@affine/core/modules/integration';
import { Trans, useI18n } from '@affine/i18n';
import { ReadwiseLogoDuotoneIcon } from '@blocksuite/icons/rc';
import { useService } from '@toeverything/infra';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState, } from 'react';
import { IntegrationCardIcon } from '../card';
import { actionButton, connectDesc, connectDialog, connectFooter, connectInput, connectTitle, getTokenLink, inputErrorMsg, } from './index.css';
import { readwiseTrack } from './track';
const ConnectDialog = ({ onClose, onSuccess, }) => {
    const t = useI18n();
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle');
    const [token, setToken] = useState('');
    const readwise = useService(IntegrationService).readwise;
    const handleCancel = useCallback(() => {
        onClose();
    }, [onClose]);
    const onOpenChange = useCallback((open) => {
        if (!open)
            handleCancel();
    }, [handleCancel]);
    const handleInput = useCallback((e) => {
        setToken(e.currentTarget.value);
        setStatus('idle');
    }, []);
    const handleResult = useCallback((success, token) => {
        readwiseTrack.connectIntegration({
            result: success ? 'success' : 'failed',
        });
        if (success) {
            onSuccess(token);
        }
        else {
            setStatus('error');
            notify.error({
                title: t['com.affine.integration.readwise.connect.error-notify-title'](),
                message: t['com.affine.integration.readwise.connect.error-notify-desc'](),
            });
        }
    }, [onSuccess, t]);
    const handleConnect = useAsyncCallback(async (token) => {
        setStatus('verifying');
        try {
            const success = await readwise.crawler.verifyToken(token);
            if (!success)
                return handleResult(false, token);
        }
        catch (err) {
            console.error(err);
            return handleResult(false, token);
        }
        handleResult(true, token);
    }, [handleResult, readwise]);
    useEffect(() => {
        const onFocus = () => inputRef.current?.focus();
        window.addEventListener('focus', onFocus);
        return () => {
            window.removeEventListener('focus', onFocus);
        };
    }, []);
    return (_jsxs(Modal, { open: true, onOpenChange: onOpenChange, contentOptions: { className: connectDialog }, children: [_jsxs("header", { className: connectTitle, children: [_jsx(IntegrationCardIcon, { children: _jsx(ReadwiseLogoDuotoneIcon, {}) }), t['com.affine.integration.readwise.connect.title']()] }), _jsx("div", { className: connectDesc, children: _jsx(Trans, { i18nKey: 'com.affine.integration.readwise.connect.desc', components: {
                        a: (_jsx("a", { href: "https://readwise.io/access_token", target: "_blank", rel: "noreferrer", className: getTokenLink })),
                        br: _jsx("br", {}),
                    } }) }), _jsx(Input, { ref: inputRef, value: token, onInput: handleInput, placeholder: t['com.affine.integration.readwise.connect.placeholder'](), type: "password", className: connectInput, status: status === 'error' ? 'error' : 'default', disabled: status === 'verifying', autoFocus: true }), _jsx("div", { className: inputErrorMsg, "data-show": status === 'error', children: t['com.affine.integration.readwise.connect.input-error']() }), _jsxs("footer", { className: connectFooter, children: [_jsx(Button, { disabled: status === 'verifying', onClick: handleCancel, children: t['Cancel']() }), _jsx(Button, { variant: "primary", disabled: status === 'verifying' || !token || status === 'error', loading: status === 'verifying', onClick: () => handleConnect(token), children: t['com.affine.integration.readwise.connect']() })] })] }));
};
export const ReadwiseConnectButton = ({ onSuccess, className, onClick, ...buttonProps }) => {
    const t = useI18n();
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);
    const handleOpen = useCallback((e) => {
        onClick?.(e);
        setOpen(true);
    }, [onClick]);
    return (_jsxs(_Fragment, { children: [open && _jsx(ConnectDialog, { onClose: handleClose, onSuccess: onSuccess }), _jsx(Button, { className: clsx(actionButton, className), onClick: handleOpen, ...buttonProps, children: t['com.affine.integration.readwise.connect']() })] }));
};
//# sourceMappingURL=connect.js.map