import { jsx as _jsx } from "react/jsx-runtime";
import { DefaultServerService } from '@affine/core/modules/cloud';
import { FrameworkScope, useService } from '@toeverything/infra';
import { useState } from 'react';
import { AddSelfhostedStep } from './add-selfhosted';
import { SignInStep } from './sign-in';
import { SignInWithEmailStep } from './sign-in-with-email';
import { SignInWithPasswordStep } from './sign-in-with-password';
export const SignInPanel = ({ onSkip, server: initialServerBaseUrl, initStep, onAuthenticated, }) => {
    const [state, setState] = useState({
        step: initStep
            ? initStep
            : initialServerBaseUrl
                ? 'addSelfhosted'
                : 'signIn',
        initialServerBaseUrl: initialServerBaseUrl,
    });
    const defaultServerService = useService(DefaultServerService);
    const step = state.step;
    const server = state.server ?? defaultServerService.server;
    return (_jsx(FrameworkScope, { scope: server.scope, children: step === 'signIn' ? (_jsx(SignInStep, { state: state, changeState: setState, onSkip: onSkip, onAuthenticated: onAuthenticated })) : step === 'signInWithEmail' ? (_jsx(SignInWithEmailStep, { state: state, changeState: setState, onAuthenticated: onAuthenticated })) : step === 'signInWithPassword' ? (_jsx(SignInWithPasswordStep, { state: state, changeState: setState, onAuthenticated: onAuthenticated })) : step === 'addSelfhosted' ? (_jsx(AddSelfhostedStep, { state: state, changeState: setState })) : null }));
};
//# sourceMappingURL=index.js.map