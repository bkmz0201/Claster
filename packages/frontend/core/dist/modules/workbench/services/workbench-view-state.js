import { createIdentifier, Service } from '@toeverything/infra';
import { nanoid } from 'nanoid';
export const WorkbenchDefaultState = createIdentifier('WorkbenchDefaultState');
export const InMemoryWorkbenchDefaultState = {
    basename: '/',
    views: [
        {
            id: nanoid(),
        },
    ],
    activeViewIndex: 0,
};
export class DesktopWorkbenchDefaultState extends Service {
    constructor(globalStateService, electronApi) {
        super();
        this.globalStateService = globalStateService;
        this.electronApi = electronApi;
    }
    get value() {
        const tabViewsMeta = this.globalStateService.globalState.get('tabViewsMetaSchema');
        return (tabViewsMeta?.workbenches.find(w => w.id === this.electronApi.appInfo.viewId) || InMemoryWorkbenchDefaultState);
    }
    get basename() {
        return this.value.basename;
    }
    get activeViewIndex() {
        return this.value.activeViewIndex;
    }
    get views() {
        return this.value.views;
    }
}
//# sourceMappingURL=workbench-view-state.js.map