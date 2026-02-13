import type { PropsWithChildren, ReactNode } from 'react';
import type { DateCell } from './types';
interface CalendarLayoutProps {
    headerLeft: ReactNode;
    headerRight: ReactNode;
    body: ReactNode;
    length: number;
    mode: 'day' | 'month' | 'year';
}
export declare const CalendarLayout: import("react").ForwardRefExoticComponent<CalendarLayoutProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const DefaultDateCell: ({ label, date, isToday, notCurrentMonth, selected, focused, }: DateCell) => import("react/jsx-runtime").JSX.Element;
interface NavButtonsProps extends PropsWithChildren {
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    onPrev?: () => void;
    onNext?: () => void;
}
export declare const NavButtons: import("react").NamedExoticComponent<NavButtonsProps>;
export {};
//# sourceMappingURL=items.d.ts.map