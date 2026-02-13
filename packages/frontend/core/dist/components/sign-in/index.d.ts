import { type Server } from '@affine/core/modules/cloud';
import type { AuthSessionStatus } from '@affine/core/modules/cloud/entities/session';
export type SignInStep = 'signIn' | 'signInWithPassword' | 'signInWithEmail' | 'addSelfhosted';
export interface SignInState {
    step: SignInStep;
    server?: Server;
    initialServerBaseUrl?: string;
    email?: string;
    hasPassword?: boolean;
    redirectUrl?: string;
}
export declare const SignInPanel: ({ onSkip, server: initialServerBaseUrl, initStep, onAuthenticated, }: {
    onAuthenticated?: (status: AuthSessionStatus) => void;
    onSkip: () => void;
    server?: string;
    initStep?: SignInStep | undefined;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map