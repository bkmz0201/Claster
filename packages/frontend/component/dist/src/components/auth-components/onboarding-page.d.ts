import type { User } from './type';
export declare const ScrollableLayout: ({ headerItems, children, isMacosDesktop, isWindowsDesktop, }: {
    isMacosDesktop?: boolean;
    isWindowsDesktop?: boolean;
    headerItems?: React.ReactNode;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const OnboardingPage: ({ user, onOpenAffine, }: {
    user: User;
    onOpenAffine: () => void;
}) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=onboarding-page.d.ts.map