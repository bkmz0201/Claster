import type { StoryFn } from '@storybook/react';
import type { AvatarProps } from './avatar';
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<{
        size?: number;
        url?: string | null;
        image?: ImageBitmap;
        name?: string;
        className?: string;
        style?: import("react").CSSProperties;
        colorfulFallback?: boolean;
        hoverIcon?: import("react").ReactElement;
        onRemove?: (e: import("react").MouseEvent<HTMLButtonElement>) => void;
        avatarTooltipOptions?: Omit<import("../tooltip").TooltipProps, "children">;
        removeTooltipOptions?: Omit<import("../tooltip").TooltipProps, "children">;
        rounded?: number | string;
        fallbackProps?: import("@radix-ui/react-avatar").AvatarFallbackProps;
        imageProps?: Omit<import("@radix-ui/react-avatar").AvatarImageProps & React.HTMLProps<HTMLCanvasElement>, "src" | "ref">;
        avatarProps?: import("@radix-ui/react-avatar").AvatarProps;
        hoverWrapperProps?: import("react").HTMLAttributes<HTMLDivElement>;
        removeButtonProps?: import("react").HTMLAttributes<HTMLButtonElement>;
    } & import("react").HTMLAttributes<HTMLSpanElement> & import("react").RefAttributes<HTMLSpanElement>>;
    argTypes: {
        onClick: () => void;
    };
};
export default _default;
export declare const DefaultAvatar: StoryFn<AvatarProps>;
export declare const Fallback: StoryFn<AvatarProps>;
export declare const ColorfulFallback: StoryFn<AvatarProps>;
export declare const ColorfulFallbackWithDifferentSize: StoryFn<AvatarProps>;
export declare const WithHover: StoryFn<AvatarProps>;
export declare const WithRemove: StoryFn<AvatarProps>;
export declare const CustomizeBorderRadius: StoryFn<AvatarProps>;
//# sourceMappingURL=avatar.stories.d.ts.map