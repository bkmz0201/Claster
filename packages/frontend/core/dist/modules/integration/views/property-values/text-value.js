import { jsx as _jsx } from "react/jsx-runtime";
import { PropertyValue } from '@affine/component';
import * as styles from './styles.css';
export const TextValue = ({ value }) => {
    return (_jsx(PropertyValue, { hoverable: false, className: styles.value, children: value }));
};
//# sourceMappingURL=text-value.js.map