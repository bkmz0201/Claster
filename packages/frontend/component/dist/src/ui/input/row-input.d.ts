import type { CSSProperties, InputHTMLAttributes, KeyboardEventHandler } from 'react';
export type RowInputProps = {
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: (ev: FocusEvent & {
        currentTarget: HTMLInputElement;
    }) => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    autoSelect?: boolean;
    type?: HTMLInputElement['type'];
    style?: CSSProperties;
    onEnter?: (value: string) => void;
    [key: `data-${string}`]: string;
    debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'onBlur'>;
export declare const RowInput: import("react").ForwardRefExoticComponent<{
    [key: `data-${string}`]: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: (ev: FocusEvent & {
        currentTarget: HTMLInputElement;
    }) => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    autoSelect?: boolean;
    type?: HTMLInputElement["type"];
    style?: CSSProperties;
    onEnter?: (value: string) => void;
    debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onChange" | "size"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=row-input.d.ts.map