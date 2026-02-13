import { jsx as _jsx } from "react/jsx-runtime";
import * as styles from './index.css';
import { useNavConfig } from './use-nav-config';
export const DesktopNavbar = () => {
    const config = useNavConfig();
    return (_jsx("div", { className: styles.topNavLinks, children: config.map(item => {
            return (_jsx("a", { href: item.path, target: "_blank", rel: "noreferrer", className: styles.topNavLink, children: item.title }, item.title));
        }) }));
};
//# sourceMappingURL=desktop-navbar.js.map