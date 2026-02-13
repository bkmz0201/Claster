import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import { forwardRef } from 'react';
export const ThemedImg = forwardRef(function ThemedImg({ lightSrc, darkSrc, ...attrs }, ref) {
    const { resolvedTheme } = useTheme();
    const src = resolvedTheme === 'dark' && darkSrc ? darkSrc : lightSrc;
    return _jsx("img", { ref: ref, src: src, ...attrs });
});
//# sourceMappingURL=index.js.map