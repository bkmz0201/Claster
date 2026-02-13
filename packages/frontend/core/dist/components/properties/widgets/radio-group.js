import { jsx as _jsx } from "react/jsx-runtime";
import { RadioGroup } from '@affine/component';
import clsx from 'clsx';
import { useMemo } from 'react';
import * as styles from './radio-group.css';
export const PropertyRadioGroup = ({ width = 194, items, value, onChange, disabled, }) => {
    const finalItems = useMemo(() => items.map(item => {
        let finalItem = { value: '' };
        if (typeof item === 'string') {
            finalItem.label = item;
            finalItem.value = item;
        }
        else {
            finalItem = { ...item };
            finalItem.className = clsx(styles.label, item.className);
        }
        return finalItem;
    }), [items]);
    return (_jsx(RadioGroup, { width: BUILD_CONFIG.isMobileEdition ? '100%' : width, itemHeight: 20, borderRadius: 8, value: value, onChange: onChange, items: finalItems, disabled: disabled }));
};
//# sourceMappingURL=radio-group.js.map