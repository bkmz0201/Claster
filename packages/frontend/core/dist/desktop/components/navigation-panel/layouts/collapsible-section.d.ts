import { type CSSProperties, type PropsWithChildren, type ReactNode, type RefObject } from 'react';
interface CollapsibleSectionProps extends PropsWithChildren {
    path: string[];
    title: string;
    actions?: ReactNode;
    className?: string;
    testId?: string;
    headerRef?: RefObject<HTMLDivElement>;
    headerTestId?: string;
    headerClassName?: string;
    contentClassName?: string;
    contentStyle?: CSSProperties;
}
export declare const CollapsibleSection: ({ path, title, actions, children, className, testId, headerRef, headerTestId, headerClassName, contentClassName, contentStyle, }: CollapsibleSectionProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=collapsible-section.d.ts.map