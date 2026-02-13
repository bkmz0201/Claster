import { debounce } from 'lodash-es';
export declare const useDebounceCallback: <T extends (...args: any[]) => any>(callback: T, delay?: number, options?: Parameters<typeof debounce>[2]) => import("lodash").DebouncedFunc<T>;
//# sourceMappingURL=use-debounce-callback.d.ts.map