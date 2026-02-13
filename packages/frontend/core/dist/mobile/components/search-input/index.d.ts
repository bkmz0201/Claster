import { type HTMLProps } from 'react';
export interface SearchInputProps extends Omit<HTMLProps<HTMLInputElement>, 'onInput'> {
    value?: string;
    height?: number;
    cornerRadius?: number;
    cornerSmoothing?: number;
    debounce?: number;
    onInput?: (value: string) => void;
}
export declare const SearchInput: import("react").ForwardRefExoticComponent<Omit<SearchInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=index.d.ts.map