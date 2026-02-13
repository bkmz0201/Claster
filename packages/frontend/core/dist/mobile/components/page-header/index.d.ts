import type { HtmlHTMLAttributes, ReactElement, ReactNode, SVGAttributes } from 'react';
export interface PageHeaderProps extends Omit<HtmlHTMLAttributes<HTMLHeadElement>, 'prefix'> {
    /**
     * whether to show back button
     */
    back?: boolean;
    backIcon?: ReactElement<SVGAttributes<SVGElement>>;
    /**
     * Override back button action
     */
    backAction?: () => void;
    /**
     * prefix content, shown after back button(if exists)
     */
    prefix?: ReactNode;
    /**
     * suffix content
     */
    suffix?: ReactNode;
    /**
     * Weather to center the content
     * @default true
     */
    centerContent?: boolean;
    contentClassName?: string;
    prefixClassName?: string;
    prefixStyle?: React.CSSProperties;
    suffixClassName?: string;
    suffixStyle?: React.CSSProperties;
    /**
     * Custom bottom content
     */
    bottom?: ReactNode;
    /**
     * Bottom Spacer height
     */
    bottomSpacer?: number;
}
export declare const PageHeader: import("react").ForwardRefExoticComponent<PageHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=index.d.ts.map