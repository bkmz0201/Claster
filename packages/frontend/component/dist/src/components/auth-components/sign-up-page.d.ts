import type { PasswordLimitsFragment } from '@affine/graphql';
import type { FC } from 'react';
export declare const SignUpPage: FC<{
    passwordLimits: PasswordLimitsFragment;
    user: {
        email?: string;
    };
    onSetPassword: (password: string) => Promise<void>;
    openButtonText?: string;
    onOpenAffine: () => void;
}>;
//# sourceMappingURL=sign-up-page.d.ts.map