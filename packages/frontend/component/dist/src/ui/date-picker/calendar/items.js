import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeftSmallIcon, ArrowRightSmallIcon } from '@blocksuite/icons/rc';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef, memo } from 'react';
import { IconButton } from '../../button';
import * as styles from './calendar.css';
const autoHeight = { height: 'auto' };
/**
 * The `DatePicker` should work with different width
 * This is a hack to make header's item align with calendar cell's label, **instead of the cell**
 * @param length: number of items that calendar body row has
 */
const HeaderLayout = memo(function HeaderLayout({ length, left, right, className, style, mode, ...attrs }) {
    const vars = assignInlineVars({ '--len': `${length}` });
    const finalStyle = { ...vars, ...style };
    return (_jsx("div", { className: clsx(styles.monthViewRow, className), style: finalStyle, ...attrs, children: Array.from({ length })
            .fill(0)
            .map((_, index) => {
            const isLeft = index === 0;
            const isRight = index === length - 1;
            return (_jsx("div", { "data-length": length, "data-is-left": isLeft, "data-is-right": isRight, className: clsx({
                    [styles.monthViewBodyCell]: mode === 'day',
                    [styles.yearViewBodyCell]: mode === 'month',
                    [styles.decadeViewBodyCell]: mode === 'year',
                }), style: autoHeight, children: _jsx("div", { className: styles.headerLayoutCellOrigin, children: isLeft ? left : isRight ? right : null }) }, index));
        }) }));
});
export const CalendarLayout = forwardRef(({ headerLeft, headerRight, body, length, mode }, ref) => {
    return (_jsxs("div", { className: styles.calendarWrapper, ref: ref, "data-mode": mode, "data-mobile": BUILD_CONFIG.isMobileEdition, children: [_jsx(HeaderLayout, { mode: mode, length: length, left: headerLeft, right: headerRight, className: styles.calendarHeader }), body] }));
});
CalendarLayout.displayName = 'CalendarLayout';
export const DefaultDateCell = ({ label, date, isToday, notCurrentMonth, selected, focused, }) => {
    return (_jsx("button", { "data-is-date-cell": true, "data-value": date.format('YYYY-MM-DD'), "data-is-today": isToday, "data-not-current-month": notCurrentMonth, "data-selected": selected, tabIndex: focused ? 0 : -1, className: styles.monthViewBodyCellInner, children: label }));
};
const iconButtonSize = BUILD_CONFIG.isMobileEdition ? 28 : 16;
export const NavButtons = memo(function NavButtons({ children, prevDisabled, nextDisabled, onPrev, onNext, }) {
    return (_jsxs("div", { className: styles.headerNavButtons, children: [_jsx(IconButton, { size: iconButtonSize, disabled: prevDisabled, "data-testid": "date-picker-nav-prev", onClick: onPrev, children: _jsx(ArrowLeftSmallIcon, {}) }, "nav-btn-prev"), children ?? _jsx("div", { className: styles.headerNavGapFallback }), _jsx(IconButton, { size: iconButtonSize, disabled: nextDisabled, "data-testid": "date-picker-nav-next", onClick: onNext, children: _jsx(ArrowRightSmallIcon, {}) }, "nav-btn-next")] }, "nav-btn-group"));
});
//# sourceMappingURL=items.js.map