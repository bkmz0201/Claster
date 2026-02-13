import { LiveData, Service } from '@toeverything/infra';
import type { GlobalState } from '../../storage';
import type { WorkspacesService } from '../../workspace';
export declare enum OpenLinkMode {
    ALWAYS_ASK = "always-ask",// default
    OPEN_IN_WEB = "open-in-web",
    OPEN_IN_DESKTOP_APP = "open-in-desktop-app"
}
export declare class OpenInAppService extends Service {
    readonly globalState: GlobalState;
    readonly workspacesService: WorkspacesService;
    private initialized;
    private initialUrl;
    readonly showOpenInAppBanner$: LiveData<boolean>;
    readonly showOpenInAppPage$: LiveData<boolean | undefined>;
    constructor(globalState: GlobalState, workspacesService: WorkspacesService);
    onNavigation(): void;
    /**
     * Given the initial URL, check if we need to redirect to the desktop app.
     */
    bootstrap(): void;
    showOpenInAppPage(): void;
    hideOpenInAppPage(): void;
    getOpenLinkMode(): OpenLinkMode;
    openLinkMode$: LiveData<OpenLinkMode>;
    setOpenLinkMode(mode: OpenLinkMode): void;
    dismissBanner(rememberMode: OpenLinkMode | undefined): void;
}
//# sourceMappingURL=index.d.ts.map