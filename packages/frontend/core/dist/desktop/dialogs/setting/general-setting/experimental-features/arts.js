import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from 'next-themes';
import * as styles from './arts.css';
import DarkSvg from './dark-art-svg';
import LightSvg from './light-art-svg';
export const ExperimentalFeatureArts = () => {
    const { resolvedTheme } = useTheme();
    return (_jsx("div", { className: styles.root, dangerouslySetInnerHTML: {
            __html: resolvedTheme === 'dark' ? DarkSvg : LightSvg,
        } }));
};
//# sourceMappingURL=arts.js.map