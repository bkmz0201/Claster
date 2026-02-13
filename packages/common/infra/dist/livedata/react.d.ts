import type { LiveData } from './livedata';
/**
 * subscribe LiveData and return the value.
 */
export declare function useLiveData<Input extends LiveData<any> | null | undefined>(liveData: Input): NonNullable<Input> extends LiveData<infer T> ? Input extends undefined ? T | undefined : Input extends null ? T | null : T : never;
//# sourceMappingURL=react.d.ts.map