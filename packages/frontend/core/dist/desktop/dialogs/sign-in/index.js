import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from '@affine/component';
import { SignInPanel } from '@affine/core/components/sign-in';
import { useCallback } from 'react';
export const SignInDialog = ({ close, server: initialServerBaseUrl, step, }) => {
    const onAuthenticated = useCallback((status) => {
        if (status === 'authenticated') {
            close();
        }
    }, [close]);
    return (_jsx(Modal, { open: true, persistent: true, onOpenChange: () => close(), width: 400, contentOptions: {
            ['data-testid']: 'auth-modal',
            style: {
                padding: '44px 40px 20px',
                minHeight: 550,
                maxHeight: 650,
            },
        }, children: _jsx(SignInPanel, { onSkip: close, onAuthenticated: onAuthenticated, server: initialServerBaseUrl, initStep: step }) }));
};
//# sourceMappingURL=index.js.map