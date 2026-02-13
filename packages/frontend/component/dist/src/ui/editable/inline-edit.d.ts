import type { CSSProperties, ForwardedRef, HTMLAttributes } from 'react';
export interface InlineEditHandle {
    triggerEdit: () => void;
}
export interface InlineEditProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange' | 'onInput'> {
    /**
     * Content to be displayed
     */
    value?: string;
    /**
     * Whether the content is editable
     */
    editable?: boolean;
    /**
     * Whether to exit when pressing `Escape`
     */
    exitible?: boolean;
    onInput?: (v: string) => void;
    onChange?: (v: string) => void;
    /**
     * Trigger edit by `click` or `doubleClick`
     * @default `'doubleClick'`
     */
    trigger?: 'click' | 'doubleClick';
    /**
     * Placeholder when value is empty
     */
    placeholder?: string;
    /**
     * Custom placeholder `className`
     */
    placeholderClassName?: string;
    /**
     * Custom placeholder `style`
     */
    placeholderStyle?: CSSProperties;
    handleRef?: ForwardedRef<InlineEditHandle>;
    /**
     * Customize attrs for the input
     */
    inputAttrs?: Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;
}
export declare const InlineEdit: ({ value, editable, exitible, className, style, trigger, onInput, onChange, placeholder, placeholderClassName, placeholderStyle, handleRef, inputAttrs, ...attrs }: InlineEditProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=inline-edit.d.ts.map