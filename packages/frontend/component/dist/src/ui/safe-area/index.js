import { jsx as _jsx } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { withUnit } from '../../utils/with-unit';
import { bottomOffsetVar, safeArea, topOffsetVar } from './style.css';
export const SafeArea = forwardRef(function SafeArea({ children, className, style, top, bottom, topOffset = 0, bottomOffset = 0, ...attrs }, ref) {
    return (_jsx("div", { ref: ref, className: clsx(safeArea, className), "data-standalone": environment.isPwa || BUILD_CONFIG.isAndroid || BUILD_CONFIG.isIOS
            ? ''
            : undefined, "data-bottom": bottom ? '' : undefined, "data-top": top ? '' : undefined, style: {
            ...style,
            ...assignInlineVars({
                [topOffsetVar]: withUnit(topOffset, 'px'),
                [bottomOffsetVar]: withUnit(bottomOffset, 'px'),
            }),
        }, ...attrs, children: children }));
});
//# sourceMappingURL=index.js.map