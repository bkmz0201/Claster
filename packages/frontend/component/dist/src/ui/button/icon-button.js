import { jsx as _jsx } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { forwardRef, } from 'react';
import { Button } from './button';
import { iconButton, iconSizeVar } from './button.css';
export const IconButton = forwardRef(({ variant = 'plain', size = '20', style, className, children, icon, iconClassName, iconStyle, ...otherProps }, ref) => {
    const validatedSize = isNaN(parseInt(size, 10)) ? 16 : size;
    return (_jsx(Button, { ref: ref, style: {
            ...style,
            ...assignInlineVars({
                [iconSizeVar]: `${validatedSize}px`,
            }),
        }, "data-icon-variant": variant, "data-icon-size": validatedSize, className: clsx(iconButton, className), size: 'custom', variant: 'custom', prefix: children ?? icon, prefixClassName: iconClassName, prefixStyle: iconStyle, ...otherProps }));
});
IconButton.displayName = 'IconButton';
export default IconButton;
//# sourceMappingURL=icon-button.js.map