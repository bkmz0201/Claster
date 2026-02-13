import { jsx as _jsx } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import * as styles from './calendar.css';
import { DATE_MAX, DATE_MIN } from './constants';
import { DayPicker } from './day-picker';
import { MonthPicker } from './month-picker';
import { defaultDatePickerProps } from './types';
import { YearPicker } from './year-picker';
/**
 * Inline DatePicker
 * @returns
 */
export const DatePicker = (props) => {
    const finalProps = { ...defaultDatePickerProps, ...props };
    const { value, gapX, gapY, cellFontSize, cellSize, onChange } = finalProps;
    const [mode, setMode] = useState('day');
    const [cursor, setCursor] = useState(dayjs(value));
    const variables = assignInlineVars({
        [styles.vars.gapX]: `${gapX}px`,
        [styles.vars.gapY]: `${gapY}px`,
        [styles.vars.cellFontSize]: `${cellFontSize}px`,
        [styles.vars.cellSize]: `${cellSize}px`,
    });
    const Component = mode === 'day' ? DayPicker : mode === 'month' ? MonthPicker : YearPicker;
    const onPreChange = useCallback((v) => {
        setMode('day');
        setCursor(dayjs(v));
        onChange?.(v);
    }, [onChange]);
    const onCursorChange = useCallback((newCursor) => {
        // validate range
        if (newCursor.isBefore(DATE_MIN))
            newCursor = dayjs(DATE_MIN);
        else if (newCursor.isAfter(DATE_MAX))
            newCursor = dayjs(DATE_MAX);
        setCursor(newCursor);
    }, []);
    return (_jsx("div", { className: styles.calendarRoot, style: variables, "data-testid": "date-picker-calendar", children: _jsx(Component, { cursor: cursor, ...finalProps, onChange: onPreChange, onCursorChange: onCursorChange, onModeChange: setMode }) }));
};
//# sourceMappingURL=calendar.js.map