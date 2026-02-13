import type dayjs from 'dayjs';
import type { ReactNode } from 'react';
export interface DatePickerProps {
    /**
     * selected date value, format is defined by `format` prop
     */
    value?: string;
    /**
     * @default 'YYYY-MM-DD'
     */
    format?: string;
    /**
     * Customize the vertical gap between each row, in `px`
     * @default 8 (mobile: 16)
     */
    gapY?: number;
    /**
     * Customize the horizontal gap between each column, in `px`
     * Attention: for responsive layout, this will only affect the minimum gap, the actual gap will be calculated based on the available space
     * @default 8
     */
    gapX?: number;
    /**
     * Customize the size of the cell, in `px`
     * @default 28 (mobile: 34)
     */
    cellSize?: number;
    /**
     * Customize the font size of the cell, in `px`
     * @default 14 (mobile: 17)
     */
    cellFontSize?: number;
    /**
     * Customize weekdays, use `,` to separate each day
     * @default {} `'Su,Mo,Tu,We,Th,Fr,Sa'`
     **/
    weekDays?: string;
    /**
     * Customize month names
     */
    monthNames?: string;
    /**
     * Customize today label
     */
    todayLabel?: string;
    /**
     * Customize rendering of day cell
     */
    customDayRenderer?: (cell: DateCell) => ReactNode;
    /**
     * when date is clicked
     */
    onChange?: (value: string) => void;
    monthHeaderCellClassName?: string;
    monthBodyCellClassName?: string;
}
/**
 * Date for a cell in the calendar
 */
export interface DateCell {
    date: dayjs.Dayjs;
    label: string;
    isToday: boolean;
    notCurrentMonth: boolean;
    selected?: boolean;
    focused?: boolean;
}
export type SelectMode = 'day' | 'month' | 'year';
export declare const defaultDatePickerProps: {
    format: string;
    gapX: number;
    gapY: number;
    cellFontSize: number;
    cellSize: number;
    weekDays: string;
    monthNames: string;
    todayLabel: string;
};
export type DefaultDatePickerProps = typeof defaultDatePickerProps;
export interface DatePickerModePanelProps extends DefaultDatePickerProps, Omit<DatePickerProps, keyof DefaultDatePickerProps> {
    cursor: dayjs.Dayjs;
    onCursorChange?: (cursor: dayjs.Dayjs) => void;
    onModeChange?: (mode: SelectMode) => void;
}
//# sourceMappingURL=types.d.ts.map