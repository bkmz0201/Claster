import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SwipeHelper } from '@affine/core/mobile/utils';
import { useI18n } from '@affine/i18n';
import { animate, eases } from 'animejs';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState, } from 'react';
import { DATE_FORMAT, HORIZONTAL_SWIPE_THRESHOLD } from './constants';
import { JournalDatePickerContext } from './context';
import { DayCell } from './day-cell';
import { getFirstDayOfWeek } from './utils';
import * as styles from './week.css';
export const WeekHeader = memo(function WeekHeader({ className, ...attrs }) {
    const t = useI18n();
    const days = useMemo(() => t['com.affine.calendar-date-picker.week-days']().split(','), [t]);
    return (_jsx("div", { className: clsx(styles.weekRow, className), ...attrs, children: days.map(day => {
            return (_jsx("div", { className: styles.weekHeaderCell, children: day }, day));
        }) }));
});
export const WeekRow = memo(function WeekRow({ start, className, ...attrs }) {
    const days = useMemo(() => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(dayjs(start).add(i, 'day').format(DATE_FORMAT));
        }
        return days;
    }, [start]);
    return (_jsx("div", { className: clsx(styles.weekRow, className), ...attrs, children: days.map(day => (_jsx(DayCell, { date: day }, day))) }));
});
export const WeekRowSwipe = ({ start }) => {
    const { width, onSelect, setCursor } = useContext(JournalDatePickerContext);
    const rootRef = useRef(null);
    const swipeRef = useRef(null);
    const [swiping, setSwiping] = useState(false);
    const [swipingDeltaX, setSwipingDeltaX] = useState(0);
    const [animating, setAnimating] = useState(false);
    const translateX = Math.max(-width, Math.min(width, swipingDeltaX));
    const animateTo = useCallback((dir) => {
        setAnimating(true);
        if (!swipeRef.current)
            return;
        animate(swipeRef.current, {
            translateX: -dir * width,
            ease: eases.inOutSine,
            duration: 300,
            onComplete: () => {
                setSwipingDeltaX(0);
                setAnimating(false);
                if (dir !== 0) {
                    setTimeout(() => onSelect(getFirstDayOfWeek(start, dir)));
                }
            },
        });
    }, [onSelect, start, width]);
    useEffect(() => {
        if (!rootRef.current)
            return;
        const swipeHelper = new SwipeHelper();
        return swipeHelper.init(rootRef.current, {
            preventScroll: true,
            onSwipe({ deltaX }) {
                setSwiping(true);
                setSwipingDeltaX(deltaX);
                if (Math.abs(deltaX) > HORIZONTAL_SWIPE_THRESHOLD) {
                    setCursor(getFirstDayOfWeek(start, deltaX > 0 ? -1 : 1));
                }
                else {
                    setCursor(start);
                }
            },
            onSwipeEnd({ deltaX, speedX }) {
                setSwiping(false);
                if (Math.abs(deltaX) > HORIZONTAL_SWIPE_THRESHOLD || speedX > 100) {
                    animateTo(deltaX > 0 ? -1 : 1);
                }
                else {
                    animateTo(0);
                }
            },
        });
    }, [animateTo, setCursor, start]);
    return (_jsx("div", { ref: rootRef, className: styles.weekSwipeRoot, children: _jsxs("div", { ref: swipeRef, className: styles.weekSwipeSlide, style: { transform: `translateX(${translateX}px)` }, children: [swiping || animating ? (_jsx(WeekRow, { className: styles.weekSwipeItem, start: getFirstDayOfWeek(start, -1) })) : (_jsx("div", { className: styles.weekSwipeItem })), _jsx(WeekRow, { className: styles.weekSwipeItem, start: start }), swiping || animating ? (_jsx(WeekRow, { className: styles.weekSwipeItem, start: getFirstDayOfWeek(start, 1) })) : (_jsx("div", { className: styles.weekSwipeItem }))] }) }));
};
//# sourceMappingURL=week.js.map