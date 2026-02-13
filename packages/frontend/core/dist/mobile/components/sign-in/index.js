import { jsx as _jsx } from "react/jsx-runtime";
import { SignInPanel } from '@affine/core/components/sign-in';
import { useCallback } from 'react';
import { MobileSignInLayout } from './layout';
export const MobileSignInPanel = ({ onClose, server, initStep, }) => {
    const onAuthenticated = useCallback((status) => {
        if (status === 'authenticated') {
            onClose();
        }
    }, [onClose]);
    return (_jsx(MobileSignInLayout, { children: _jsx(SignInPanel, { onSkip: onClose, onAuthenticated: onAuthenticated, server: server, initStep: initStep }) }));
};
//# sourceMappingURL=index.js.map