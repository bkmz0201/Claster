import { type CustomLottieProps } from '@affine/component/internal-lottie';
import type { HTMLAttributes } from 'react';
import type React from 'react';
type HoverAnimateControllerProps = {
    active?: boolean;
    hide?: boolean;
    trash?: boolean;
    children: React.ReactElement<CustomLottieProps>;
} & HTMLAttributes<HTMLDivElement>;
export declare const PageSwitchItem: (props: Omit<HoverAnimateControllerProps, "children">) => import("react/jsx-runtime").JSX.Element;
export declare const EdgelessSwitchItem: (props: Omit<HoverAnimateControllerProps, "children">) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=switch-items.d.ts.map