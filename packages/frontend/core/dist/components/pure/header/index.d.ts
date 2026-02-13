import type { ReactNode } from 'react';
interface HeaderPros {
    left?: ReactNode;
    right?: ReactNode;
    center?: ReactNode;
    bottomBorder?: boolean;
}
export declare const Header: {
    ({ left, center, right }: HeaderPros): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const HeaderDivider: () => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map