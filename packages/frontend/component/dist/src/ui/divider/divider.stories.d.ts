import type { StoryFn } from '@storybook/react';
import type { DividerProps } from './index';
declare const _default: {
    title: string;
    component: import("react").ForwardRefExoticComponent<{
        children?: import("react").ReactNode | undefined;
    } & Omit<import("react").HTMLAttributes<HTMLDivElement>, "type"> & {
        orientation?: import("./divider").DividerOrientation;
        size?: "thinner" | "default";
        space?: number;
        dividerColor?: string;
    } & import("react").RefAttributes<HTMLDivElement>>;
};
export default _default;
export declare const Default: StoryFn<DividerProps>;
//# sourceMappingURL=divider.stories.d.ts.map