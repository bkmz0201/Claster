import type { Workbench } from '../entities/workbench';
/**
 * This hook binds the workbench to the browser router.
 *
 * It listens to the browser location and updates the active view accordingly.
 *
 * In desktop, we not really care about the browser history, we only listen it,
 * and never modify it.
 *
 * REPLACE and POP action in browser history is not supported.
 * To do these actions, you should use the workbench API.
 */
export declare function useBindWorkbenchToDesktopRouter(workbench: Workbench, basename: string): void;
//# sourceMappingURL=desktop-adapter.d.ts.map