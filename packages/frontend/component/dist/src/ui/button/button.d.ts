import type { CSSProperties, HTMLAttributes, ReactElement, SVGAttributes } from 'react';
import { type TooltipProps } from '../tooltip';
export type ButtonType = 'primary' | 'secondary' | 'plain' | 'error' | 'success' | 'custom';
export type ButtonSize = 'default' | 'large' | 'extraLarge' | 'custom';
export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'type' | 'prefix'> {
    /**
     * Preset color scheme
     * @default 'secondary'
     */
    variant?: ButtonType;
    disabled?: boolean;
    /**
     * By default, the button is `inline-flex`, set to `true` to make it `flex`
     * @default false
     */
    block?: boolean;
    /**
     * Preset size, will be overridden by `style` or `className`
     * @default 'default'
     */
    size?: ButtonSize;
    /**
     * Will show a loading spinner at `prefix` position
     */
    loading?: boolean;
    /** No hover state */
    withoutHover?: boolean;
    /**
     * By default, it is considered as an icon with preset size and color,
     * can be overridden by `prefixClassName` and `prefixStyle`.
     *
     * If `loading` is true, will be replaced by a spinner.(`prefixClassName` and `prefixStyle` still work)
     * */
    prefix?: ReactElement<SVGAttributes<SVGElement>>;
    prefixClassName?: string;
    prefixStyle?: CSSProperties;
    contentClassName?: string;
    contentStyle?: CSSProperties;
    /**
     * By default, it is considered as an icon with preset size and color,
     * can be overridden by `suffixClassName` and `suffixStyle`.
     * */
    suffix?: ReactElement<SVGAttributes<SVGElement>>;
    suffixClassName?: string;
    suffixStyle?: CSSProperties;
    tooltip?: TooltipProps['content'];
    tooltipShortcut?: TooltipProps['shortcut'];
    tooltipOptions?: Partial<Omit<TooltipProps, 'content' | 'shortcut'>>;
    [key: `data-${string}`]: string;
}
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Button;
//# sourceMappingURL=button.d.ts.map