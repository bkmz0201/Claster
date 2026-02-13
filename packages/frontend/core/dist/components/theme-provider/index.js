import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppThemeService } from '@affine/core/modules/theme';
import { useService } from '@toeverything/infra';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';
const themes = ['dark', 'light'];
function ThemeObserver() {
    const { resolvedTheme } = useTheme();
    const service = useService(AppThemeService);
    useEffect(() => {
        service.appTheme.theme$.next(resolvedTheme);
    }, [resolvedTheme, service.appTheme.theme$]);
    return null;
}
export const ThemeProvider = ({ children }) => {
    return (_jsxs(NextThemeProvider, { themes: themes, enableSystem: true, children: [children, _jsx(ThemeObserver, {})] }));
};
//# sourceMappingURL=index.js.map