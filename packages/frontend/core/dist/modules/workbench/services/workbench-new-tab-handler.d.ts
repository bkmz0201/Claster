import { Service } from '@toeverything/infra';
import { type To } from 'history';
import type { DesktopApiService } from '../../desktop-api';
export type WorkbenchNewTabHandler = {
    handle: (option: {
        basename: string;
        to: To;
        show: boolean;
    }) => void;
};
export declare const WorkbenchNewTabHandler: import("@toeverything/infra").Identifier<WorkbenchNewTabHandler> & ((variant: string) => import("@toeverything/infra").Identifier<WorkbenchNewTabHandler>);
export declare const BrowserWorkbenchNewTabHandler: WorkbenchNewTabHandler;
export declare class DesktopWorkbenchNewTabHandler extends Service implements WorkbenchNewTabHandler {
    private readonly electronApi;
    constructor(electronApi: DesktopApiService);
    handle({ basename, to, show }: {
        basename: string;
        to: To;
        show: boolean;
    }): void;
}
//# sourceMappingURL=workbench-new-tab-handler.d.ts.map