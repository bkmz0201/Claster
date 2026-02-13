import * as Sliders from '@radix-ui/react-slider';
export interface SliderProps extends Sliders.SliderProps {
    width?: number;
    thumbSize?: number;
    containerStyle?: React.CSSProperties;
    rootStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    rangeStyle?: React.CSSProperties;
    thumbStyle?: React.CSSProperties;
    noteStyle?: React.CSSProperties;
    nodes?: number[];
}
export declare const Slider: ({ value, min, max, step, width, nodes, containerStyle, rootStyle, trackStyle, rangeStyle, thumbStyle, noteStyle, thumbSize, disabled, ...props }: SliderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=slider.d.ts.map