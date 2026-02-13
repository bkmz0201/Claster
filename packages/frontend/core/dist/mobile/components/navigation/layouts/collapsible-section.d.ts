import { type HTMLAttributes, type ReactNode } from 'react';
interface CollapsibleSectionProps extends HTMLAttributes<HTMLDivElement> {
    path: string[];
    title: string;
    actions?: ReactNode;
    testId?: string;
    headerTestId?: string;
    headerClassName?: string;
    contentClassName?: string;
}
export declare const CollapsibleSection: ({ path, title, actions, testId, headerClassName, headerTestId, contentClassName, children, ...attrs }: CollapsibleSectionProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=collapsible-section.d.ts.map