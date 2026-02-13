import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { JournalDatePickerContext } from './context';
import { ResizeViewport } from './viewport';
export const JournalDatePicker = ({ date: selected, onChange, withDotDates, ...attrs }) => {
    const [cursor, setCursor] = useState(selected);
    // should update cursor when selected modified outside
    useEffect(() => {
        setCursor(selected);
    }, [selected]);
    const onSelect = useCallback((date) => {
        setCursor(date);
        onChange(date);
    }, [onChange]);
    return (_jsx(JournalDatePickerContext.Provider, { value: {
            selected,
            onSelect,
            cursor,
            setCursor,
            width: window.innerWidth,
            withDotDates,
        }, children: _jsx(ResizeViewport, { ...attrs }) }));
};
//# sourceMappingURL=index.js.map