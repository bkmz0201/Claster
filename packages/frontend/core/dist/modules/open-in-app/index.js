import {} from '@toeverything/infra';
import { GlobalState } from '../storage';
import { WorkspacesService } from '../workspace';
import { OpenInAppService } from './services';
export { OpenInAppService, OpenLinkMode } from './services';
export * from './utils';
export * from './views/open-in-app-guard';
export const configureOpenInApp = (framework) => {
    framework.service(OpenInAppService, [GlobalState, WorkspacesService]);
};
//# sourceMappingURL=index.js.map