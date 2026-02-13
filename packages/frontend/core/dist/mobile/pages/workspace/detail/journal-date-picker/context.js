import { createContext } from 'react';
export const JournalDatePickerContext = createContext({
    width: window.innerWidth,
    cursor: '',
    setCursor: () => { },
    selected: '',
    onSelect: () => { },
    withDotDates: new Set(),
});
//# sourceMappingURL=context.js.map