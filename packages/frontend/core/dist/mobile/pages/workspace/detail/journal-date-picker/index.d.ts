import { type HTMLAttributes } from 'react';
export interface JournalDatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    date: string;
    onChange: (date: string) => void;
    withDotDates: Set<string | null | undefined>;
}
export declare const JournalDatePicker: ({ date: selected, onChange, withDotDates, ...attrs }: JournalDatePickerProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map