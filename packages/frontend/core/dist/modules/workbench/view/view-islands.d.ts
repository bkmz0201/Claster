/**
 * # View Islands
 *
 * This file defines some components that allow each UI area to be defined inside each View route as shown below,
 * and the Workbench is responsible for rendering these areas into their containers.
 *
 * ```tsx
 * const MyView = () => {
 *   return <>
 *     <ViewHeader>
 *       ...
 *     </ViewHeader>
 *     <ViewBody>
 *       ...
 *     </ViewBody>
 *     <ViewSidebarTab tabId="my-tab" icon={<MyIcon />}>
 *       ...
 *     </ViewSidebarTab>
 *   </>
 * }
 *
 * const viewRoute = [
 *   {
 *     path: '/my-view',
 *     component: MyView,
 *   }
 * ]
 * ```
 *
 * Each Island is divided into `Target` and `Provider`.
 * The `Provider` wraps the content to be rendered, while the `Target` is placed where it needs to be rendered.
 * Then you get a view portal.
 */
import type React from 'react';
export declare const ViewIslandRegistryProvider: ({ children, }: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export declare const ViewBody: ({ children }: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export declare const ViewBodyTarget: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLDivElement> & {
    viewId: string;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const ViewHeader: ({ children }: React.PropsWithChildren) => import("react/jsx-runtime").JSX.Element;
export declare const ViewHeaderTarget: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLDivElement> & {
    viewId: string;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const ViewSidebarTab: ({ children, tabId, icon, unmountOnInactive, }: React.PropsWithChildren<{
    tabId: string;
    icon: React.ReactNode;
    unmountOnInactive?: boolean;
}>) => import("react/jsx-runtime").JSX.Element;
export declare const ViewSidebarTabIconTarget: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLDivElement> & {
    tabId: string;
    viewId: string;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const ViewSidebarTabBodyTarget: React.ForwardRefExoticComponent<Omit<React.HTMLProps<HTMLDivElement> & {
    tabId: string;
    viewId: string;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=view-islands.d.ts.map