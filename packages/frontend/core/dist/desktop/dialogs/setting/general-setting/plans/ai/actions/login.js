import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@affine/component';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
export const AILogin = (btnProps) => {
    const t = useI18n();
    const globalDialogService = useService(GlobalDialogService);
    const onClickSignIn = useCallback(() => {
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    return (_jsx(Button, { onClick: onClickSignIn, variant: "primary", ...btnProps, children: t['com.affine.payment.ai.action.login.button-label']() }));
};
//# sourceMappingURL=login.js.map