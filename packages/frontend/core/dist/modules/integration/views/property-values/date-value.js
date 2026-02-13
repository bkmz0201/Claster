import { jsx as _jsx } from "react/jsx-runtime";
import { PropertyValue, Tooltip } from '@affine/component';
import { i18nTime } from '@affine/i18n';
import { useMemo } from 'react';
import * as styles from './styles.css';
export const DateValue = ({ value }) => {
    const accuracySecond = useMemo(() => {
        return i18nTime(value, { absolute: { accuracy: 'second' } });
    }, [value]);
    const accuracyDay = useMemo(() => {
        return i18nTime(value, { absolute: { accuracy: 'day' } });
    }, [value]);
    return (_jsx(PropertyValue, { className: styles.value, hoverable: false, children: _jsx(Tooltip, { content: accuracySecond, side: "right", children: _jsx("span", { children: accuracyDay }) }) }));
};
//# sourceMappingURL=date-value.js.map