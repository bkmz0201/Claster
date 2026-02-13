import { Entity, LiveData } from '@toeverything/infra';
import { map } from 'rxjs';
var APP_SIDEBAR_STATE;
(function (APP_SIDEBAR_STATE) {
    APP_SIDEBAR_STATE["OPEN"] = "open";
    APP_SIDEBAR_STATE["WIDTH"] = "width";
})(APP_SIDEBAR_STATE || (APP_SIDEBAR_STATE = {}));
export class AppSidebar extends Entity {
    constructor(appSidebarState) {
        super();
        this.appSidebarState = appSidebarState;
        /**
         * whether the sidebar is open,
         * even if the sidebar is not open, hovering can show the floating sidebar
         */
        this.open$ = LiveData.from(this.appSidebarState
            .watch(APP_SIDEBAR_STATE.OPEN)
            .pipe(map(value => value ?? true)), this.appSidebarState.get(APP_SIDEBAR_STATE.OPEN) ?? true);
        this.width$ = LiveData.from(this.appSidebarState
            .watch(APP_SIDEBAR_STATE.WIDTH)
            .pipe(map(value => value ?? 248)), this.appSidebarState.get(APP_SIDEBAR_STATE.WIDTH) ?? 248);
        /**
         * hovering can show the floating sidebar, without open it
         */
        this.hovering$ = new LiveData(false);
        /**
         * prevent it from setting hovering once when the sidebar is closed
         */
        this.preventHovering$ = new LiveData(false);
        /**
         * small screen mode, will disable hover effect
         */
        this.smallScreenMode$ = new LiveData(false);
        this.resizing$ = new LiveData(false);
        this.getCachedAppSidebarOpenState = () => {
            return this.appSidebarState.get(APP_SIDEBAR_STATE.OPEN);
        };
        this.toggleSidebar = () => {
            this.setOpen(!this.open$.value);
        };
        this.setOpen = (open) => {
            this.appSidebarState.set(APP_SIDEBAR_STATE.OPEN, open);
            return;
        };
        this.setSmallScreenMode = (smallScreenMode) => {
            this.smallScreenMode$.next(smallScreenMode);
        };
        this.setHovering = (hoverFloating) => {
            this.hovering$.next(hoverFloating);
        };
        this.setPreventHovering = (preventHovering) => {
            this.preventHovering$.next(preventHovering);
        };
        this.setResizing = (resizing) => {
            this.resizing$.next(resizing);
        };
        this.setWidth = (width) => {
            this.appSidebarState.set(APP_SIDEBAR_STATE.WIDTH, width);
        };
    }
}
//# sourceMappingURL=app-sidebar.js.map