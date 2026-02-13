import type { AuthSessionStatus } from '@affine/core/modules/cloud/entities/session';
import type { Dispatch, SetStateAction } from 'react';
import type { SignInState } from '.';
export declare const SignInWithPasswordStep: ({ state, changeState, onAuthenticated, }: {
    state: SignInState;
    changeState: Dispatch<SetStateAction<SignInState>>;
    onAuthenticated?: (status: AuthSessionStatus) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=sign-in-with-password.d.ts.map