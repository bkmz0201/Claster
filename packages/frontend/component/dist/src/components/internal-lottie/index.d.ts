export interface CustomLottieProps {
    options: {
        loop?: boolean | number | undefined;
        autoReverse?: boolean | undefined;
        autoplay?: boolean | undefined;
        animationData: any;
        rendererSettings?: {
            preserveAspectRatio?: string | undefined;
        };
    };
    isStopped?: boolean | undefined;
    speed?: number | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
}
export declare const InternalLottie: ({ options, isStopped, speed, width, height, }: CustomLottieProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map