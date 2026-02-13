import { type HTMLAttributes, type ReactNode } from 'react';
interface PageProps extends HTMLAttributes<HTMLDivElement> {
    tab?: boolean;
    header?: ReactNode;
}
/**
 * A Page is a full-screen container that will not scroll on document.
 */
export declare const Page: ({ children, tab, header, ...attrs }: PageProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map