import type { AvatarFallbackProps, AvatarImageProps, AvatarProps as RadixAvatarProps } from '@radix-ui/react-avatar';
import type { CSSProperties, HTMLAttributes, MouseEvent, ReactElement } from 'react';
import type { TooltipProps } from '../tooltip';
export type AvatarProps = {
    size?: number;
    url?: string | null;
    image?: ImageBitmap;
    name?: string;
    className?: string;
    style?: CSSProperties;
    colorfulFallback?: boolean;
    hoverIcon?: ReactElement;
    onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
    avatarTooltipOptions?: Omit<TooltipProps, 'children'>;
    removeTooltipOptions?: Omit<TooltipProps, 'children'>;
    /**
     * Same as `CSS.borderRadius`, number in px or string with unit
     * @default '50%'
     */
    rounded?: number | string;
    fallbackProps?: AvatarFallbackProps;
    imageProps?: Omit<AvatarImageProps & React.HTMLProps<HTMLCanvasElement>, 'src' | 'ref'>;
    avatarProps?: RadixAvatarProps;
    hoverWrapperProps?: HTMLAttributes<HTMLDivElement>;
    removeButtonProps?: HTMLAttributes<HTMLButtonElement>;
} & HTMLAttributes<HTMLSpanElement>;
export declare const Avatar: import("react").ForwardRefExoticComponent<{
    size?: number;
    url?: string | null;
    image?: ImageBitmap;
    name?: string;
    className?: string;
    style?: CSSProperties;
    colorfulFallback?: boolean;
    hoverIcon?: ReactElement;
    onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
    avatarTooltipOptions?: Omit<TooltipProps, "children">;
    removeTooltipOptions?: Omit<TooltipProps, "children">;
    /**
     * Same as `CSS.borderRadius`, number in px or string with unit
     * @default '50%'
     */
    rounded?: number | string;
    fallbackProps?: AvatarFallbackProps;
    imageProps?: Omit<AvatarImageProps & React.HTMLProps<HTMLCanvasElement>, "src" | "ref">;
    avatarProps?: RadixAvatarProps;
    hoverWrapperProps?: HTMLAttributes<HTMLDivElement>;
    removeButtonProps?: HTMLAttributes<HTMLButtonElement>;
} & HTMLAttributes<HTMLSpanElement> & import("react").RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=avatar.d.ts.map