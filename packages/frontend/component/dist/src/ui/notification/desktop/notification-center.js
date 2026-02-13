import { jsx as _jsx } from "react/jsx-runtime";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { Toaster } from 'sonner';
import { cardWrapper } from './styles.css';
const toastOptions = {
    style: {
        width: '100%',
    },
    className: cardWrapper,
};
export function DesktopNotificationCenter({ width = 380, }) {
    const theme = useTheme();
    const resolvedTheme = theme.resolvedTheme;
    const style = useMemo(() => {
        return {
            ...assignInlineVars({
                // override css vars inside sonner
                '--width': `${width}px`,
            }),
            // radix-ui will lock pointer-events when dialog is open
            pointerEvents: 'auto',
        };
    }, [width]);
    return (_jsx(Toaster, { className: "affine-notification-center", style: style, toastOptions: toastOptions, theme: resolvedTheme }));
}
//# sourceMappingURL=notification-center.js.map