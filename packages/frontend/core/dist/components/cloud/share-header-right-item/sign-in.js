import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@affine/component/ui/button';
import { GlobalDialogService } from '@affine/core/modules/dialogs';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { useCallback } from 'react';
import * as styles from './styles.css';
export const SignIn = () => {
    const globalDialogService = useService(GlobalDialogService);
    const t = useI18n();
    const onClickSignIn = useCallback(() => {
        globalDialogService.open('sign-in', {});
    }, [globalDialogService]);
    return (_jsx(Button, { className: styles.editButton, onClick: onClickSignIn, "data-testid": "share-page-sign-in-button", children: t['com.affine.share-page.header.login']() }));
};
//# sourceMappingURL=sign-in.js.map