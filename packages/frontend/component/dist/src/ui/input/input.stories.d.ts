import type { StoryFn } from '@storybook/react';
import type { InputProps } from './index';
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<{
        disabled?: boolean;
        onChange?: (value: string) => void;
        onBlur?: (ev: FocusEvent & {
            currentTarget: HTMLInputElement;
        }) => void;
        onKeyDown?: import("react").KeyboardEventHandler<HTMLInputElement>;
        autoSelect?: boolean;
        noBorder?: boolean;
        status?: "error" | "success" | "warning" | "default";
        size?: "default" | "large" | "extraLarge";
        preFix?: import("react").ReactNode;
        endFix?: import("react").ReactNode;
        type?: HTMLInputElement["type"];
        inputStyle?: import("react").CSSProperties;
        onEnter?: (value: string) => void;
    } & Omit<import("react").InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onChange" | "size"> & import("react").RefAttributes<HTMLInputElement>>;
};
export default _default;
export declare const Default: StoryFn<InputProps>;
export declare const WithPrefix: StoryFn<InputProps>;
export declare const Large: StoryFn<InputProps>;
export declare const ExtraLarge: StoryFn<InputProps>;
export declare const CustomWidth: StoryFn<InputProps>;
export declare const ErrorStatus: StoryFn<InputProps>;
export declare const WarningStatus: StoryFn<InputProps>;
export declare const Disabled: StoryFn<InputProps>;
//# sourceMappingURL=input.stories.d.ts.map