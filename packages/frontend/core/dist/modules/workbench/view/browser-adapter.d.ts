import type { Workbench } from '../entities/workbench';
/**
 * This hook binds the workbench to the browser router.
 * It listens to the active view and updates the browser location accordingly.
 * It also listens to the browser location and updates the active view accordingly.
 *
 * The history of the active view and the browser are two different stacks.
 *
 * In the browser, we use browser history as the criterion, and view history is not very important.
 * So our synchronization strategy is as follows:
 *
 * 1. When the active view history changed, we update the browser history, based on the update action.
 *    - If the update action is PUSH, we navigate to the new location.
 *    - If the update action is REPLACE, we replace the current location.
 * 2. When the browser location changed, we update the active view history just in PUSH action.
 * 3. To avoid infinite loop, we add a state to the location to indicate the source of the change.
 */
export declare function useBindWorkbenchToBrowserRouter(workbench: Workbench, basename: string): void;
//# sourceMappingURL=browser-adapter.d.ts.map