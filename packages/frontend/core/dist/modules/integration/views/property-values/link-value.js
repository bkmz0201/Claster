import { jsx as _jsx } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import * as styles from './styles.css';
export const LinkValue = ({ value }) => {
    return (_jsx("a", { href: value, target: "_blank", rel: "noopener noreferrer", className: styles.linkWrapper, children: _jsx(PropertyValue, { className: styles.value, children: value }) }));
};
//# sourceMappingURL=link-value.js.map