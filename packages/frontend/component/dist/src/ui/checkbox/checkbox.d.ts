import type { HTMLAttributes } from 'react';
export type CheckboxProps = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    animation?: boolean;
    name?: string;
    label?: string;
    inputClassName?: string;
    labelClassName?: string;
};
export declare const Checkbox: ({ checked, onChange, indeterminate, disabled, animation, name, label, inputClassName, labelClassName, className, ...otherProps }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
export declare const playCheckAnimation: (refElement: Element) => Promise<void>;
//# sourceMappingURL=checkbox.d.ts.map