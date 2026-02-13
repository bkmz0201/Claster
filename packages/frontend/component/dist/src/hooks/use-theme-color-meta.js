import { useLayoutEffect } from 'react';
import { useThemeValueV1, useThemeValueV2 } from './use-theme-value';
let meta = null;
function getMeta() {
    if (meta)
        return meta;
    const exists = document.querySelector('meta[name="theme-color"]');
    if (exists) {
        meta = exists;
        return meta;
    }
    // create and append meta
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.append(meta);
    return meta;
}
export const useThemeColorMeta = (color) => {
    useLayoutEffect(() => {
        const meta = getMeta();
        const old = meta.content;
        meta.content = color;
        // also modify document background (for over scroll bounce effect)
        const oldBg = document.documentElement.style.backgroundColor;
        document.documentElement.style.backgroundColor = color;
        return () => {
            meta.content = old;
            document.documentElement.style.backgroundColor = oldBg;
        };
    }, [color]);
};
export const useThemeColorV1 = (...args) => {
    useThemeColorMeta(useThemeValueV1(...args));
};
export const useThemeColorV2 = (...args) => {
    useThemeColorMeta(useThemeValueV2(...args));
};
//# sourceMappingURL=use-theme-color-meta.js.map