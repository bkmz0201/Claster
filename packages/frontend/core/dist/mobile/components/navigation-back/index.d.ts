import { type IconButtonProps } from '@affine/component';
export interface NavigationBackButtonProps extends IconButtonProps {
    backAction?: () => void;
}
/**
 * A button to control the back behavior of the mobile app, as well as manage navigation gesture
 */
export declare const NavigationBackButton: ({ icon, backAction, children, style: propsStyle, ...otherProps }: NavigationBackButtonProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map