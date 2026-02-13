import type { PasswordLimitsFragment } from '@affine/graphql';
import type { FC } from 'react';
export declare const ChangePasswordPage: FC<{
    passwordLimits: PasswordLimitsFragment;
    onSetPassword: (password: string) => Promise<void>;
    onOpenAffine: () => void;
}>;
//# sourceMappingURL=change-password-page.d.ts.map