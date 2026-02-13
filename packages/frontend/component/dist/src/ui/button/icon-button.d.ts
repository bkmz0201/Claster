import { type CSSProperties, type ReactElement, type SVGAttributes } from 'react';
import { type ButtonProps } from './button';
export interface IconButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'prefix' | 'suffix' | 'children' | 'prefixClassName' | 'prefixStyle' | 'suffix' | 'suffixClassName' | 'suffixStyle'> {
    /**  Icon element */
    children?: ReactElement<SVGAttributes<SVGElement>>;
    /** Same as `children`, compatibility of the old API */
    icon?: ReactElement<SVGAttributes<SVGElement>>;
    variant?: 'plain' | 'solid' | 'danger' | 'custom';
    /**
     * Use preset size,
     * or use custom size(px) (default padding is `2px`, have to override yourself)
     *
     * > These presets size are referenced from the design system.
     * > The number is the size of the icon, the button size is calculated based on the icon size + padding.
     * > OR, you can define `width` and `height` in `style` or `className` directly.
     */
    size?: '12' | '14' | '16' | '20' | '24' | number;
    iconClassName?: string;
    iconStyle?: CSSProperties;
}
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default IconButton;
//# sourceMappingURL=icon-button.d.ts.map