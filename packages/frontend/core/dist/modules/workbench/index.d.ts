export { View as WorkbenchView } from './entities/view';
export { Workbench } from './entities/workbench';
export { ViewScope } from './scopes/view';
export { ViewService } from './services/view';
export { WorkbenchService } from './services/workbench';
export { useBindWorkbenchToBrowserRouter } from './view/browser-adapter';
export { useIsActiveView } from './view/use-is-active-view';
export { ViewBody, ViewHeader, ViewSidebarTab } from './view/view-islands';
export { ViewIcon, ViewTitle } from './view/view-meta';
export type { WorkbenchLinkProps } from './view/workbench-link';
export { WorkbenchLink } from './view/workbench-link';
export { WorkbenchRoot } from './view/workbench-root';
import { type Framework } from '@toeverything/infra';
export declare function configureWorkbenchCommonModule(services: Framework): void;
export declare function configureBrowserWorkbenchModule(services: Framework): void;
export declare function configureDesktopWorkbenchModule(services: Framework): void;
//# sourceMappingURL=index.d.ts.map