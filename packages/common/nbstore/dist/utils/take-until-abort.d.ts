import { type OperatorFunction } from 'rxjs';
/**
 * Creates an operator that takes values from the source Observable until the given AbortSignal aborts.
 * When the signal aborts, the Observable completes.
 *
 * @param signal - The AbortSignal that will trigger completion when aborted
 * @returns An operator function that takes values until the signal aborts
 */
export declare function takeUntilAbort<T>(signal?: AbortSignal): OperatorFunction<T, T>;
//# sourceMappingURL=take-until-abort.d.ts.map