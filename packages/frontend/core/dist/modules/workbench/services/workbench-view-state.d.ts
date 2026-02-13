import { Service } from '@toeverything/infra';
import type { DesktopApiService } from '../../desktop-api';
import type { GlobalStateService } from '../../storage';
import type { ViewIconName } from '../constants';
export type WorkbenchDefaultState = {
    basename: string;
    views: {
        id: string;
        path?: {
            pathname?: string;
            hash?: string;
            search?: string;
        };
        icon?: ViewIconName;
        title?: string;
    }[];
    activeViewIndex: number;
};
export declare const WorkbenchDefaultState: import("@toeverything/infra").Identifier<WorkbenchDefaultState> & ((variant: string) => import("@toeverything/infra").Identifier<WorkbenchDefaultState>);
export declare const InMemoryWorkbenchDefaultState: WorkbenchDefaultState;
export declare class DesktopWorkbenchDefaultState extends Service implements WorkbenchDefaultState {
    private readonly globalStateService;
    private readonly electronApi;
    constructor(globalStateService: GlobalStateService, electronApi: DesktopApiService);
    get value(): WorkbenchDefaultState | {
        id: string;
        activeViewIndex: number;
        basename: string;
        views: {
            id: string;
            path?: {
                search?: string | undefined;
                pathname?: string | undefined;
                hash?: string | undefined;
            } | undefined;
            title?: string | undefined;
            iconName?: "trash" | "allDocs" | "collection" | "tag" | "doc" | "page" | "edgeless" | "journal" | "attachment" | "pdf" | "ai" | undefined;
        }[];
        pinned?: boolean | undefined;
    };
    get basename(): string;
    get activeViewIndex(): number;
    get views(): {
        id: string;
        path?: {
            pathname?: string;
            hash?: string;
            search?: string;
        };
        icon?: ViewIconName;
        title?: string;
    }[] | {
        id: string;
        path?: {
            search?: string | undefined;
            pathname?: string | undefined;
            hash?: string | undefined;
        } | undefined;
        title?: string | undefined;
        iconName?: "trash" | "allDocs" | "collection" | "tag" | "doc" | "page" | "edgeless" | "journal" | "attachment" | "pdf" | "ai" | undefined;
    }[];
}
//# sourceMappingURL=workbench-view-state.d.ts.map