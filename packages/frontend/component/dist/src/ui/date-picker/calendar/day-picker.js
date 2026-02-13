import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import * as styles from './calendar.css';
import { DATE_MAX, DATE_MIN } from './constants';
import { CalendarLayout, DefaultDateCell, NavButtons } from './items';
export const DayPicker = memo(function DayPicker(props) {
    const dayPickerRootRef = useRef(null);
    const headerMonthRef = useRef(null);
    const { value, cursor, weekDays, monthNames, format, todayLabel, customDayRenderer, onChange, onCursorChange, onModeChange, monthHeaderCellClassName, monthBodyCellClassName, } = props;
    const matrix = useMemo(() => {
        const firstDayOfMonth = cursor.startOf('month');
        const firstDayOfFirstWeek = firstDayOfMonth.startOf('week');
        const lastDayOfMonth = cursor.endOf('month');
        const lastDayOfLastWeek = lastDayOfMonth.endOf('week');
        const matrix = [];
        let currentDay = firstDayOfFirstWeek;
        while (currentDay.isBefore(lastDayOfLastWeek)) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push({
                    date: currentDay,
                    label: currentDay.date().toString(),
                    isToday: currentDay.isSame(dayjs(), 'day'),
                    notCurrentMonth: !currentDay.isSame(cursor, 'month'),
                    selected: value ? currentDay.isSame(value, 'day') : false,
                    focused: currentDay.isSame(cursor, 'day'),
                });
                currentDay = currentDay.add(1, 'day');
            }
            matrix.push(week);
        }
        return matrix;
    }, [cursor, value]);
    const prevDisabled = useMemo(() => {
        const firstDayOfMonth = cursor.startOf('month');
        return firstDayOfMonth.isSame(DATE_MIN, 'day');
    }, [cursor]);
    const nextDisabled = useMemo(() => {
        const lastDayOfMonth = cursor.endOf('month');
        return lastDayOfMonth.isSame(DATE_MAX, 'day');
    }, [cursor]);
    const onNextMonth = useCallback(() => {
        onCursorChange?.(cursor.add(1, 'month').set('date', 1));
    }, [cursor, onCursorChange]);
    const onPrevMonth = useCallback(() => {
        onCursorChange?.(cursor.add(-1, 'month').set('date', 1));
    }, [cursor, onCursorChange]);
    const focusCursor = useCallback(() => {
        const div = dayPickerRootRef.current;
        if (!div)
            return;
        const focused = div.querySelector('[data-is-date-cell][tabindex="0"]');
        focused && focused.focus();
    }, []);
    const openMonthPicker = useCallback(() => onModeChange?.('month'), [onModeChange]);
    const openYearPicker = useCallback(() => onModeChange?.('year'), [onModeChange]);
    // keyboard navigation
    useEffect(() => {
        const div = dayPickerRootRef.current;
        if (!div)
            return;
        const onKeyDown = (e) => {
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key))
                return;
            const focused = document.activeElement;
            // check if focused is a date cell
            if (!focused?.dataset.isDateCell)
                return;
            if (e.shiftKey)
                return;
            e.preventDefault();
            e.stopPropagation();
            if (e.key === 'ArrowUp')
                onCursorChange?.(cursor.add(-7, 'day'));
            if (e.key === 'ArrowDown')
                onCursorChange?.(cursor.add(7, 'day'));
            if (e.key === 'ArrowLeft')
                onCursorChange?.(cursor.add(-1, 'day'));
            if (e.key === 'ArrowRight')
                onCursorChange?.(cursor.add(1, 'day'));
            setTimeout(focusCursor);
        };
        div.addEventListener('keydown', onKeyDown);
        return () => {
            div?.removeEventListener('keydown', onKeyDown);
        };
    }, [cursor, focusCursor, onCursorChange]);
    const HeaderLeft = useMemo(() => (_jsxs("div", { style: { whiteSpace: 'nowrap' }, children: [_jsx("button", { onClick: openMonthPicker, ref: headerMonthRef, className: styles.calendarHeaderTriggerButton, "data-testid": "month-picker-button", "data-month": cursor.month(), "data-year": cursor.year(), children: monthNames.split(',')[cursor.month()] }), _jsx("button", { className: styles.calendarHeaderTriggerButton, onClick: openYearPicker, "data-testid": "year-picker-button", "data-year": cursor.year(), children: cursor.year() })] })), [cursor, monthNames, openMonthPicker, openYearPicker]);
    const HeaderRight = useMemo(() => (_jsx(NavButtons, { onNext: onNextMonth, onPrev: onPrevMonth, prevDisabled: prevDisabled, nextDisabled: nextDisabled, children: _jsx("button", { className: styles.headerNavToday, onClick: () => onChange?.(dayjs().format(format)), children: todayLabel }) }, "nav-buttons")), [
        format,
        nextDisabled,
        onChange,
        onNextMonth,
        onPrevMonth,
        prevDisabled,
        todayLabel,
    ]);
    const Body = useMemo(() => (_jsxs("main", { className: styles.monthViewBody, children: [_jsx("div", { className: styles.monthViewRow, children: weekDays.split(',').map(day => (_jsx("div", { className: clsx(styles.monthViewHeaderCell, monthHeaderCellClassName), children: day }, day))) }), matrix.map((week, i) => {
                return (
                // eslint-disable-next-line react/no-array-index-key
                _jsx("div", { className: clsx(styles.monthViewRow), children: week.map(cell => {
                        const dateValue = cell.date.format(format);
                        return (_jsx("div", { className: clsx(styles.monthViewBodyCell, monthBodyCellClassName), onClick: () => onChange?.(dateValue), children: customDayRenderer ? (customDayRenderer(cell)) : (_jsx(DefaultDateCell, { ...cell }, dateValue)) }, dateValue));
                    }) }, i));
            })] })), [
        customDayRenderer,
        format,
        matrix,
        monthBodyCellClassName,
        monthHeaderCellClassName,
        onChange,
        weekDays,
    ]);
    return (_jsx(CalendarLayout, { mode: "day", ref: dayPickerRootRef, length: 7, headerLeft: HeaderLeft, headerRight: HeaderRight, body: Body }));
});
//# sourceMappingURL=day-picker.js.map