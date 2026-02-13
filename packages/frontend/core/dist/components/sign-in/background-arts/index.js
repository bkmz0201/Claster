import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import darkArt from './art-dark.inline.svg';
import lightArt from './art-light.inline.svg';
import { arts, wrapper } from './style.css';
export function SignInBackgroundArts() {
    const { resolvedTheme } = useTheme();
    return (_jsx("div", { className: wrapper, children: _jsx("img", { src: resolvedTheme === 'dark' ? darkArt : lightArt, className: arts }) }));
}
//# sourceMappingURL=index.js.map