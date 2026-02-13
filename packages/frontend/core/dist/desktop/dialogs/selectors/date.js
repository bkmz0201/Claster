import { jsx as _jsx } from "react/jsx-runtime";
import { DatePicker, Menu } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { cssVarV2 } from '@toeverything/theme/v2';
import { useCallback, useState } from 'react';
/**
 * A global date selector popover, mainly used in blocksuite editor
 */
export const DateSelectorDialog = ({ close, position, onSelect, }) => {
    const [selectedDate, setSelectedDate] = useState();
    const t = useI18n();
    const onClose = useCallback((open) => {
        if (!open) {
            close();
        }
    }, [close]);
    const handleSelect = useCallback((date) => {
        setSelectedDate(date);
        onSelect?.(date);
    }, [onSelect]);
    return (_jsx(Menu, { rootOptions: {
            modal: true,
            open: true,
            onOpenChange: onClose,
        }, contentOptions: {
            side: 'bottom',
            sideOffset: 8,
            align: 'start',
            style: {
                padding: 20,
                borderRadius: 8,
                background: cssVarV2('layer/background/primary'),
            },
        }, items: _jsx(DatePicker, { weekDays: t['com.affine.calendar-date-picker.week-days'](), monthNames: t['com.affine.calendar-date-picker.month-names'](), todayLabel: t['com.affine.calendar-date-picker.today'](), value: selectedDate, onChange: handleSelect }), children: _jsx("div", { style: position
                ? {
                    position: 'fixed',
                    left: position[0],
                    top: position[1],
                    width: position[2],
                    height: position[3],
                }
                : {
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    width: 0,
                    height: 0,
                } }) }));
};
//# sourceMappingURL=date.js.map