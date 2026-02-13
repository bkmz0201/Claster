import { Entity, LiveData } from '@toeverything/infra';
import type { AppSidebarState } from '../providers/storage';
export declare class AppSidebar extends Entity {
    private readonly appSidebarState;
    constructor(appSidebarState: AppSidebarState);
    /**
     * whether the sidebar is open,
     * even if the sidebar is not open, hovering can show the floating sidebar
     */
    open$: LiveData<boolean>;
    width$: LiveData<number>;
    /**
     * hovering can show the floating sidebar, without open it
     */
    hovering$: LiveData<boolean>;
    /**
     * prevent it from setting hovering once when the sidebar is closed
     */
    preventHovering$: LiveData<boolean>;
    /**
     * small screen mode, will disable hover effect
     */
    smallScreenMode$: LiveData<boolean>;
    resizing$: LiveData<boolean>;
    getCachedAppSidebarOpenState: () => boolean | undefined;
    toggleSidebar: () => void;
    setOpen: (open: boolean) => void;
    setSmallScreenMode: (smallScreenMode: boolean) => void;
    setHovering: (hoverFloating: boolean) => void;
    setPreventHovering: (preventHovering: boolean) => void;
    setResizing: (resizing: boolean) => void;
    setWidth: (width: number) => void;
}
//# sourceMappingURL=app-sidebar.d.ts.map