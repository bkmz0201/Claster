import type { ReactNode } from 'react';
import type { InputProps } from '../../ui/input';
export type AuthInputProps = InputProps & {
    label?: string;
    error?: boolean;
    errorHint?: ReactNode;
    onEnter?: () => void;
};
export declare const AuthInput: ({ label, error, errorHint, onEnter, className, ...inputProps }: AuthInputProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=auth-input.d.ts.map