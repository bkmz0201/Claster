import { type PasswordLimitsFragment } from '@affine/graphql';
import { type FC } from 'react';
import type { InputProps } from '../../../ui/input';
export type Status = 'weak' | 'medium' | 'strong' | 'minimum' | 'maximum';
export declare const PasswordInput: FC<InputProps & {
    passwordLimits: PasswordLimitsFragment;
    onPass: (password: string) => void;
    onPrevent: () => void;
}>;
//# sourceMappingURL=index.d.ts.map