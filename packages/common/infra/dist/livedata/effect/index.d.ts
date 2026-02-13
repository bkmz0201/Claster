import { type OperatorFunction } from 'rxjs';
export type Effect<T> = (T | undefined extends T ? () => void : (value: T) => void) & {
    unsubscribe: () => void;
    reset: () => void;
};
/**
 * Create an effect.
 *
 * `effect( op1, op2, op3, ... )`
 *
 * You can think of an effect as a pipeline. When the effect is called, argument will be sent to the pipeline,
 * and the operators in the pipeline can be triggered.
 *
 *
 *
 * @example
 * ```ts
 * const loadUser = effect(
 *   switchMap((id: number) =>
 *     from(fetchUser(id)).pipe(
 *       mapInto(user$),
 *       catchErrorInto(error$),
 *       onStart(() => isLoading$.next(true)),
 *       onComplete(() => isLoading$.next(false))
 *     )
 *   )
 * );
 *
 * // emit value to effect
 * loadUser(1);
 *
 * // unsubscribe effect, will stop all ongoing processes
 * loadUser.unsubscribe();
 * ```
 */
export declare function effect<T, A>(op1: OperatorFunction<T, A>): Effect<T>;
export declare function effect<T, A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Effect<T>;
export declare function effect<T, A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Effect<T>;
export declare function effect<T, A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Effect<T>;
export declare function effect<T, A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Effect<T>;
export declare function effect<T, A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Effect<T>;
//# sourceMappingURL=index.d.ts.map