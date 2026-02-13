import { jsx as _jsx } from "react/jsx-runtime";
import { notify } from '@affine/component';
import { useI18n } from '@affine/i18n';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';
import { actionButton, cancelButton, confirmButton, notifyHeader, } from './notify.css';
export const useDowngradeNotify = () => {
    const t = useI18n();
    const prevNotifyIdRef = useRef(null);
    return useCallback((link) => {
        prevNotifyIdRef.current && notify.dismiss(prevNotifyIdRef.current);
        const actions = [
            {
                key: 'later',
                label: t['com.affine.payment.downgraded-notify.later'](),
                onClick: () => { },
                buttonProps: {
                    className: clsx(actionButton, cancelButton),
                },
            },
            {
                key: 'ok',
                label: BUILD_CONFIG.isElectron
                    ? t['com.affine.payment.downgraded-notify.ok-client']()
                    : t['com.affine.payment.downgraded-notify.ok-web'](),
                onClick: () => {
                    window.open(link, '_blank', 'noreferrer');
                },
                buttonProps: {
                    className: clsx(actionButton, confirmButton),
                },
            },
        ];
        const id = notify({
            title: (_jsx("span", { className: notifyHeader, children: t['com.affine.payment.downgraded-notify.title']() })),
            message: t['com.affine.payment.downgraded-notify.content'](),
            alignMessage: 'title',
            icon: null,
            actions,
        }, { duration: 24 * 60 * 60 * 1000 });
        prevNotifyIdRef.current = id;
    }, [t]);
};
//# sourceMappingURL=notify.js.map