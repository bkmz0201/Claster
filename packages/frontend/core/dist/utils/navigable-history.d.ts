import type { Location, MemoryHistory, MemoryHistoryOptions } from 'history';
export interface NavigableHistory extends MemoryHistory {
    entries: Location[];
}
/**
 * Same as `createMemoryHistory` from `history` package, but with additional `entries` property.
 *
 * Original `MemoryHistory` does not have `entries` property, so we can't get `backable` and `forwardable` state which
 * is needed for implementing back and forward buttons.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#creatememoryhistory
 */
export declare function createNavigableHistory(options?: MemoryHistoryOptions): NavigableHistory;
//# sourceMappingURL=navigable-history.d.ts.map