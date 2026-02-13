export interface ProgressProps {
    /**
     * The value of the progress bar.
     * A value between 0 and 100.
     */
    value: number;
    onChange?: (value: number) => void;
    onBlur?: () => void;
    readonly?: boolean;
    className?: string;
    style?: React.CSSProperties;
    testId?: string;
}
export declare const Progress: ({ value, onChange, onBlur, readonly, className, style, testId, }: ProgressProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=progress.d.ts.map