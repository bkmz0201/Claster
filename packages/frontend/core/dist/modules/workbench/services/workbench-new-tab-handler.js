import { createIdentifier, Service } from '@toeverything/infra';
import { parsePath } from 'history';
export const WorkbenchNewTabHandler = createIdentifier('WorkbenchNewTabHandler');
export const BrowserWorkbenchNewTabHandler = {
    handle: ({ basename, to }) => {
        const link = basename +
            (typeof to === 'string' ? to : `${to.pathname}${to.search}${to.hash}`);
        window.open(link, '_blank');
    },
};
export class DesktopWorkbenchNewTabHandler extends Service {
    constructor(electronApi) {
        super();
        this.electronApi = electronApi;
    }
    handle({ basename, to, show }) {
        const path = typeof to === 'string' ? parsePath(to) : to;
        this.electronApi.api.handler.ui
            .addTab({
            basename,
            view: { path },
            show: show,
        })
            .catch(console.error);
    }
}
//# sourceMappingURL=workbench-new-tab-handler.js.map