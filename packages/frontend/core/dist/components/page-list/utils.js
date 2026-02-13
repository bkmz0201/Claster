import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { forwardRef } from 'react';
import * as styles from './list.css';
export const ColWrapper = forwardRef(function ColWrapper({ flex, alignment, hideInSmallContainer, hidden, className, style, children, ...rest }, ref) {
    return (_jsx("div", { ...rest, ref: ref, "data-testid": "page-list-flex-wrapper", style: {
            ...style,
            flexGrow: flex,
            flexBasis: flex ? `${(flex / 12) * 100}%` : 'auto',
            justifyContent: alignment,
        }, "data-hide-item": hideInSmallContainer ? true : undefined, className: clsx(className, styles.colWrapper, {
            [styles.hidden]: hidden,
            [styles.hideInSmallContainer]: hideInSmallContainer,
        }), children: children }));
});
export const withinDaysAgo = (date, days) => {
    const startDate = new Date();
    const day = startDate.getDate();
    const month = startDate.getMonth();
    const year = startDate.getFullYear();
    return new Date(year, month, day - days + 1) <= date;
};
export const betweenDaysAgo = (date, days0, days1) => {
    return !withinDaysAgo(date, days0) && withinDaysAgo(date, days1);
};
//# sourceMappingURL=utils.js.map