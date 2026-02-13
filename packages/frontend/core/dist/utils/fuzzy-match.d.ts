/**
 * Checks if the name is a fuzzy match of the query.
 *
 * @example
 * ```ts
 * const name = 'John Smith';
 * const query = 'js';
 * const isMatch = fuzzyMatch(name, query);
 * // isMatch: true
 * ```
 *
 * if initialMatch = true, the first char must match as well
 */
export declare function fuzzyMatch(name: string, query: string, matchInitial?: boolean): boolean;
//# sourceMappingURL=fuzzy-match.d.ts.map