import type { MouseEvent } from 'react';
interface OpenAppProps {
    urlToOpen?: string | null;
    openHereClicked?: (e: MouseEvent) => void;
    mode?: 'auth' | 'open-doc';
}
export declare const OpenInAppPage: ({ urlToOpen, openHereClicked, mode, }: OpenAppProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=open-in-app-page.d.ts.map