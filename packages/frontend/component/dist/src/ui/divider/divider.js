import { jsx as _jsx } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef } from 'react';
import * as styles from './style.css';
export const Divider = forwardRef(({ orientation = 'horizontal', size = 'default', space: propSpace, dividerColor, style, className, ...otherProps }, ref) => {
    const space = propSpace ?? (orientation === 'horizontal' ? 8 : 2);
    return (_jsx("div", { "data-divider": true, ref: ref, className: clsx(styles.divider, {
            [styles.verticalDivider]: orientation === 'vertical',
            [styles.thinner]: size === 'thinner',
        }, className), style: {
            borderColor: dividerColor ? dividerColor : undefined,
            ...style,
            ...assignInlineVars({ [styles.dividerSpace]: `${space}px` }),
        }, ...otherProps }));
});
Divider.displayName = 'Divider';
export default Divider;
//# sourceMappingURL=divider.js.map