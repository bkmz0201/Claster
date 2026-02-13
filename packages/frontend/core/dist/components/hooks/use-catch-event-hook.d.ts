import { type DependencyList, type SyntheticEvent } from 'react';
export declare const useCatchEventCallback: <E extends SyntheticEvent, Args extends any[]>(cb: (e: E, ...args: Args) => void | Promise<void>, deps: DependencyList) => (e: E, ...args: Args) => void;
//# sourceMappingURL=use-catch-event-hook.d.ts.map