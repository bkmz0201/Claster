import type { CSSProperties } from 'react';
export type WrapperProps = {
    display?: CSSProperties['display'];
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    padding?: CSSProperties['padding'];
    paddingTop?: CSSProperties['paddingTop'];
    paddingRight?: CSSProperties['paddingRight'];
    paddingLeft?: CSSProperties['paddingLeft'];
    paddingBottom?: CSSProperties['paddingBottom'];
    margin?: CSSProperties['margin'];
    marginTop?: CSSProperties['marginTop'];
    marginLeft?: CSSProperties['marginLeft'];
    marginRight?: CSSProperties['marginRight'];
    marginBottom?: CSSProperties['marginBottom'];
    flexGrow?: CSSProperties['flexGrow'];
    flexShrink?: CSSProperties['flexShrink'];
};
export type FlexWrapperProps = {
    display?: CSSProperties['display'];
    flexDirection?: CSSProperties['flexDirection'];
    justifyContent?: CSSProperties['justifyContent'];
    alignItems?: CSSProperties['alignItems'];
    wrap?: boolean;
    flexShrink?: CSSProperties['flexShrink'];
    flexGrow?: CSSProperties['flexGrow'];
    gap?: CSSProperties['gap'];
};
export declare const Wrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & WrapperProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const FlexWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & WrapperProps & import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    theme?: import("@emotion/react").Theme;
} & FlexWrapperProps, {}, {}>;
export default Wrapper;
//# sourceMappingURL=wrapper.d.ts.map