import { type HTMLAttributes, type Ref } from 'react';
export interface SliderProps<T> extends HTMLAttributes<HTMLDivElement> {
    items: T[];
    activeIndex?: number;
    itemRenderer?: (item: T, index: number) => React.ReactNode;
    /**
     * preload next and previous slides
     */
    preload?: number;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    rootRef?: Ref<HTMLDivElement>;
}
/**
 * TODO(@catsjuice): extract to @affine/ui
 * @returns
 */
export declare const Slider: <T>({ rootRef, items, className, preload, activeIndex, transitionDuration, transitionTimingFunction, itemRenderer, ...attrs }: SliderProps<T>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=slider.d.ts.map