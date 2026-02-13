import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as styles from './calendar.css';
import { DATE_MAX, DATE_MIN, YEAR_MAX, YEAR_MIN } from './constants';
import { CalendarLayout, NavButtons } from './items';
const ROW_SIZE = 3;
const DECADE = 12;
export const YearPicker = memo(function YearPicker(props) {
    const { value, cursor, onModeChange, onCursorChange } = props;
    const dayPickerRootRef = useRef(null);
    const [yearCursor, setYearCursor] = useState(dayjs(cursor).startOf('year'));
    const closeYearPicker = useCallback(() => onModeChange?.('day'), [onModeChange]);
    const onYearChange = useCallback((y) => {
        closeYearPicker();
        onCursorChange?.(y);
    }, [closeYearPicker, onCursorChange]);
    const nextDecade = useCallback(() => {
        setYearCursor(prev => prev.add(DECADE, 'year').startOf('year'));
    }, []);
    const prevDecade = useCallback(() => {
        setYearCursor(prev => prev.subtract(DECADE, 'year').startOf('year'));
    }, []);
    const decadeIndex = useMemo(() => Math.floor((yearCursor.year() - YEAR_MIN) / DECADE), [yearCursor]);
    const decadeStart = useMemo(() => dayjs(DATE_MIN).add(decadeIndex * DECADE, 'year'), [decadeIndex]);
    const decadeEnd = useMemo(() => decadeStart.add(DECADE - 1, 'year'), [decadeStart]);
    const nextDecadeDisabled = useMemo(() => yearCursor.add(DECADE, 'year').isAfter(`${YEAR_MAX}-01-01`), [yearCursor]);
    const prevDecadeDisabled = useMemo(() => decadeIndex <= 0, [decadeIndex]);
    const matrix = useMemo(() => {
        const matrix = [];
        let currentYear = decadeStart.clone();
        while (currentYear.isBefore(decadeEnd.add(1, 'year'))) {
            const row = [];
            for (let i = 0; i < ROW_SIZE; i++) {
                row.push(currentYear.clone().startOf('year'));
                currentYear = currentYear.add(1, 'year');
            }
            matrix.push(row);
        }
        return matrix;
    }, [decadeEnd, decadeStart]);
    const focusCursor = useCallback(() => {
        const div = dayPickerRootRef.current;
        if (!div)
            return;
        const focused = div.querySelector('[data-is-year-cell][tabindex="0"]');
        focused && focused.focus();
    }, []);
    // keyboard navigation
    useEffect(() => {
        const div = dayPickerRootRef.current;
        if (!div)
            return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                closeYearPicker();
                return;
            }
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key))
                return;
            e.preventDefault();
            e.stopPropagation();
            if (e.key === 'ArrowUp')
                setYearCursor(c => c.subtract(ROW_SIZE, 'year'));
            if (e.key === 'ArrowDown')
                setYearCursor(c => c.add(ROW_SIZE, 'year'));
            if (e.key === 'ArrowLeft')
                setYearCursor(c => c.subtract(1, 'year'));
            if (e.key === 'ArrowRight')
                setYearCursor(c => c.add(1, 'year'));
            setTimeout(focusCursor);
        };
        div.addEventListener('keydown', onKeyDown);
        return () => {
            div.removeEventListener('keydown', onKeyDown);
        };
    }, [closeYearPicker, focusCursor]);
    const HeaderLeft = useMemo(() => {
        return (_jsxs("button", { onClick: closeYearPicker, className: styles.calendarHeaderTriggerButton, children: [decadeStart.year(), "-", decadeEnd.year()] }));
    }, [closeYearPicker, decadeEnd, decadeStart]);
    const HeaderRight = useMemo(() => (_jsx(NavButtons, { onNext: nextDecade, onPrev: prevDecade, nextDisabled: nextDecadeDisabled, prevDisabled: prevDecadeDisabled })), [nextDecade, nextDecadeDisabled, prevDecade, prevDecadeDisabled]);
    const Body = useMemo(() => {
        return (_jsx("div", { className: styles.decadeViewBody, children: matrix.map((row, i) => {
                return (
                // eslint-disable-next-line react/no-array-index-key
                _jsx("div", { className: styles.decadeViewRow, children: row.map(year => {
                        const isDisabled = year.isAfter(DATE_MAX) || year.isBefore(DATE_MIN);
                        const yearValue = year.year();
                        return (_jsx("div", { className: styles.decadeViewBodyCell, children: _jsx("button", { "aria-disabled": isDisabled, "data-value": year.format('YYYY'), "data-is-year-cell": true, className: styles.decadeViewBodyCellInner, "data-selected": value && year.isSame(value, 'year'), "data-current-year": year.isSame(dayjs(), 'year'), tabIndex: year.isSame(yearCursor, 'year') ? 0 : -1, onClick: isDisabled ? undefined : () => onYearChange(year), children: yearValue }) }, yearValue));
                    }) }, i));
            }) }));
    }, [matrix, onYearChange, value, yearCursor]);
    return (_jsx(CalendarLayout, { mode: "year", ref: dayPickerRootRef, length: ROW_SIZE, headerLeft: HeaderLeft, headerRight: HeaderRight, body: Body }));
});
//# sourceMappingURL=year-picker.js.map