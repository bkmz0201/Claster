import { type PropsWithChildren, type ReactNode } from 'react';
/**
 * A common wrapper for detail page for both mobile and desktop page.
 * It only contains the logic for page loading, context setup, but not the page content.
 */
export declare const DetailPageWrapper: ({ pageId, children, skeleton, notFound, canAccess, }: PropsWithChildren<{
    pageId: string;
    skeleton: ReactNode;
    notFound: ReactNode;
    canAccess?: boolean;
}>) => string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
//# sourceMappingURL=detail-page-wrapper.d.ts.map