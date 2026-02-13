import type { PasswordLimitsFragment } from '@affine/graphql';
import type { FC } from 'react';
export declare const SetPassword: FC<{
    passwordLimits: PasswordLimitsFragment;
    showLater?: boolean;
    onLater?: () => void;
    onSetPassword: (password: string) => void;
}>;
//# sourceMappingURL=set-password.d.ts.map