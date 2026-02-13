import { type HTMLAttributes, type JSX, type ReactElement, type SVGAttributes, type SVGProps } from 'react';
interface NavigationPanelEmptySectionProps extends HTMLAttributes<HTMLDivElement> {
    icon: ((props: SVGProps<SVGSVGElement>) => JSX.Element) | ReactElement<SVGAttributes<SVGElement>>;
    message: string;
    messageTestId?: string;
    actionText?: string;
    onActionClick?: () => void;
}
export declare const NavigationPanelEmptySection: import("react").ForwardRefExoticComponent<NavigationPanelEmptySectionProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=empty-section.d.ts.map