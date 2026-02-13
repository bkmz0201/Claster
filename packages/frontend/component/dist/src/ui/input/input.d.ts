import type { CSSProperties, InputHTMLAttributes, KeyboardEventHandler, ReactNode } from 'react';
export type InputProps = {
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: (ev: FocusEvent & {
        currentTarget: HTMLInputElement;
    }) => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    autoSelect?: boolean;
    noBorder?: boolean;
    status?: 'error' | 'success' | 'warning' | 'default';
    size?: 'default' | 'large' | 'extraLarge';
    preFix?: ReactNode;
    endFix?: ReactNode;
    type?: HTMLInputElement['type'];
    inputStyle?: CSSProperties;
    onEnter?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'onBlur'>;
export declare const Input: import("react").ForwardRefExoticComponent<{
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: (ev: FocusEvent & {
        currentTarget: HTMLInputElement;
    }) => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    autoSelect?: boolean;
    noBorder?: boolean;
    status?: "error" | "success" | "warning" | "default";
    size?: "default" | "large" | "extraLarge";
    preFix?: ReactNode;
    endFix?: ReactNode;
    type?: HTMLInputElement["type"];
    inputStyle?: CSSProperties;
    onEnter?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onChange" | "size"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=input.d.ts.map