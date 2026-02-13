import type { CSSProperties } from 'react';
export type ContentProps = {
    width?: CSSProperties['width'];
    maxWidth?: CSSProperties['maxWidth'];
    align?: CSSProperties['textAlign'];
    color?: CSSProperties['color'];
    fontSize?: CSSProperties['fontSize'];
    weight?: CSSProperties['fontWeight'];
    lineHeight?: CSSProperties['lineHeight'];
    ellipsis?: boolean;
    lineNum?: number;
    children: React.ReactNode;
};
export declare const Content: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & ContentProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export default Content;
//# sourceMappingURL=content.d.ts.map