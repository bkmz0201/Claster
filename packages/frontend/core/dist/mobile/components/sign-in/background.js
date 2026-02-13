import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import artsDark from './art-dark.inline.svg';
import artsLight from './art-light.inline.svg';
import * as styles from './background.css';
export const SignInBackground = () => {
    const { resolvedTheme } = useTheme();
    return (_jsxs("div", { className: styles.root, children: [_jsx("div", { className: styles.dotBg }), _jsx("img", { className: styles.arts, src: resolvedTheme === 'dark' ? artsDark : artsLight })] }));
};
//# sourceMappingURL=background.js.map