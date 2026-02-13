import type { CSSProperties } from 'react';
export declare const displayFlex: (justifyContent?: CSSProperties["justifyContent"], alignItems?: CSSProperties["alignItems"], alignContent?: CSSProperties["alignContent"]) => {
    display: CSSProperties["display"];
    justifyContent: CSSProperties["justifyContent"];
    alignItems: CSSProperties["alignItems"];
    alignContent: CSSProperties["alignContent"];
};
export declare const displayInlineFlex: (justifyContent?: CSSProperties["justifyContent"], alignItems?: CSSProperties["alignContent"], alignContent?: CSSProperties["alignContent"]) => {
    display: CSSProperties["display"];
    justifyContent: CSSProperties["justifyContent"];
    alignItems: CSSProperties["alignContent"];
    alignContent: CSSProperties["alignContent"];
};
export declare const absoluteCenter: ({ horizontal, vertical, position: { left, right, top, bottom }, }: {
    horizontal?: boolean;
    vertical?: boolean;
    position?: {
        left?: CSSProperties["left"];
        right?: CSSProperties["right"];
        top?: CSSProperties["top"];
        bottom?: CSSProperties["bottom"];
    };
}) => {
    position: CSSProperties["position"];
    left: CSSProperties["left"];
    top: CSSProperties["top"];
    right: CSSProperties["right"];
    bottom: CSSProperties["bottom"];
    transform: CSSProperties["transform"];
};
export declare const fixedCenter: ({ horizontal, vertical, position: { left, right, top, bottom }, }: {
    horizontal?: boolean;
    vertical?: boolean;
    position?: {
        left?: CSSProperties["left"];
        right?: CSSProperties["right"];
        top?: CSSProperties["top"];
        bottom?: CSSProperties["bottom"];
    };
}) => {
    position: CSSProperties["position"];
    left: CSSProperties["left"];
    top: CSSProperties["top"];
    right: CSSProperties["right"];
    bottom: CSSProperties["bottom"];
    transform: CSSProperties["transform"];
};
export declare const textEllipsis: (lineNum?: number) => CSSProperties;
export declare const positionAbsolute: ({ left, top, right, bottom, }: {
    left?: CSSProperties["left"];
    top?: CSSProperties["top"];
    right?: CSSProperties["right"];
    bottom?: CSSProperties["bottom"];
}) => {
    position: CSSProperties["position"];
    left: CSSProperties["left"];
    top: CSSProperties["top"];
    right: CSSProperties["right"];
    bottom: CSSProperties["bottom"];
};
//# sourceMappingURL=helper.d.ts.map