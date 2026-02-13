import dayjs from 'dayjs';
import type { ForwardedRef, HTMLAttributes } from 'react';
export interface WeekDatePickerHandle {
    /** control cursor manually */
    setCursor?: (cursor: dayjs.Dayjs) => void;
}
export interface WeekDatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
    handleRef?: ForwardedRef<WeekDatePickerHandle>;
}
export declare const WeekDatePicker: import("react").NamedExoticComponent<WeekDatePickerProps>;
//# sourceMappingURL=week-date-picker.d.ts.map