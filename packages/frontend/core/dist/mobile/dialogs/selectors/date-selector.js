import { jsx as _jsx } from "react/jsx-runtime";
import { DatePicker, Menu } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useState } from 'react';
import { VirtualKeyboardService } from '../../modules/virtual-keyboard';
/**
 * A global date selector popover for mobile, mainly used in blocksuite editor
 */
export const DateSelectorDialog = ({ close, onSelect, }) => {
    const [selectedDate, setSelectedDate] = useState();
    const keyboardService = useService(VirtualKeyboardService);
    const keyboardHeight = useLiveData(keyboardService.height$);
    const keyboardVisible = useLiveData(keyboardService.visible$);
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
            style: {
                padding: '15px 20px',
            },
        }, contentWrapperStyle: keyboardVisible
            ? {
                paddingBottom: `calc(${keyboardHeight}px + 12px)`,
            }
            : undefined, items: _jsx(DatePicker, { weekDays: t['com.affine.calendar-date-picker.week-days'](), monthNames: t['com.affine.calendar-date-picker.month-names'](), todayLabel: t['com.affine.calendar-date-picker.today'](), value: selectedDate, onChange: handleSelect }), children: _jsx("div", {}) }));
};
//# sourceMappingURL=date-selector.js.map