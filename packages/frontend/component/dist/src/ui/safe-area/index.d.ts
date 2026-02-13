import { type HTMLAttributes } from 'react';
interface SafeAreaProps extends HTMLAttributes<HTMLDivElement> {
    top?: boolean;
    bottom?: boolean;
    topOffset?: number | string;
    bottomOffset?: number | string;
}
export declare const SafeArea: import("react").ForwardRefExoticComponent<SafeAreaProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=index.d.ts.map