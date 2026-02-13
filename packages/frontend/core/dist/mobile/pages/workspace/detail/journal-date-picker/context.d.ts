export declare const JournalDatePickerContext: import("react").Context<{
    width: number;
    /**
     * Is used to determine the current date, not same as selected,
     * `is-current-month` is based on cursor
     */
    cursor: string;
    setCursor: (date: string) => void;
    selected: string;
    onSelect: (date: string) => void;
    withDotDates: Set<string | null | undefined>;
}>;
//# sourceMappingURL=context.d.ts.map