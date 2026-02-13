import { type HTMLAttributes } from 'react';
export interface ThemedImgProps extends Omit<HTMLAttributes<HTMLImageElement>, 'src'> {
    lightSrc: string;
    darkSrc?: string;
}
export declare const ThemedImg: import("react").ForwardRefExoticComponent<ThemedImgProps & import("react").RefAttributes<HTMLImageElement>>;
//# sourceMappingURL=index.d.ts.map