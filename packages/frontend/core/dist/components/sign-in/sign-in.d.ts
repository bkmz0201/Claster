import type { AuthSessionStatus } from '@affine/core/modules/cloud/entities/session';
import { type Dispatch, type SetStateAction } from 'react';
import type { SignInState } from '.';
export declare const SignInStep: ({ state, changeState, onSkip, onAuthenticated, }: {
    state: SignInState;
    changeState: Dispatch<SetStateAction<SignInState>>;
    onSkip: () => void;
    onAuthenticated?: (status: AuthSessionStatus) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=sign-in.d.ts.map