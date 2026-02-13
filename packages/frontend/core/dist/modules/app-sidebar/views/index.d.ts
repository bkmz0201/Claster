import type { PropsWithChildren, ReactElement } from 'react';
export type History = {
    stack: string[];
    current: number;
};
export declare function AppSidebar({ children }: PropsWithChildren): import("react/jsx-runtime").JSX.Element;
export declare function FallbackHeader(): import("react/jsx-runtime").JSX.Element;
export declare function FallbackHeaderWithWorkspaceNavigator(): import("react/jsx-runtime").JSX.Element;
export declare function FallbackHeaderSkeleton(): import("react/jsx-runtime").JSX.Element;
export declare const AppSidebarFallback: () => ReactElement | null;
/**
 * NOTE(@forehalo): this is a copy of [AppSidebarFallback] without [WorkspaceNavigator] which will introduce a lot useless dependencies for shell(tab bar)
 */
export declare const ShellAppSidebarFallback: () => import("react/jsx-runtime").JSX.Element;
export * from './add-page-button';
export * from './app-download-button';
export * from './app-updater-button';
export * from './category-divider';
export * from './index.css';
export * from './menu-item';
export * from './open-in-app-card';
export * from './quick-search-input';
export * from './sidebar-containers';
export * from './sidebar-header';
//# sourceMappingURL=index.d.ts.map