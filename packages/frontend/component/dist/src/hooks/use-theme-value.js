import { darkTheme, lightTheme } from '@toeverything/theme';
import { darkThemeV2, lightThemeV2, } from '@toeverything/theme/v2';
import { useTheme } from 'next-themes';
export const useThemeValueV2 = (key) => {
    const { resolvedTheme } = useTheme();
    return resolvedTheme === 'dark' ? darkThemeV2[key] : lightThemeV2[key];
};
export const useThemeValueV1 = (key) => {
    const { resolvedTheme } = useTheme();
    return resolvedTheme === 'dark' ? darkTheme[key] : lightTheme[key];
};
//# sourceMappingURL=use-theme-value.js.map