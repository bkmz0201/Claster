import { type MenuProps } from '@affine/component';
import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
interface DropdownItem<V extends string> {
    label?: ReactNode;
    value: V;
    testId?: string;
    style?: CSSProperties;
    [key: string]: any;
}
export interface SettingDropdownSelectProps<V extends string, E extends boolean | undefined> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    options?: Array<DropdownItem<V>>;
    value?: V;
    onChange?: (v: E extends true ? DropdownItem<V>['value'] : DropdownItem<V>) => void;
    emitValue?: E;
    menuOptions?: Omit<MenuProps, 'items' | 'children'>;
    native?: boolean;
}
export declare const SettingDropdownSelect: <V extends string = string, E extends boolean | undefined = true>({ options, value, emitValue, onChange, className, menuOptions, native, ...attrs }: SettingDropdownSelectProps<V, E>) => import("react/jsx-runtime").JSX.Element;
export declare const NativeSettingDropdownSelect: <V extends string = string, E extends boolean | undefined = true>({ options, value, emitValue, onChange, className, ...attrs }: Omit<SettingDropdownSelectProps<V, E>, "native">) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=dropdown-select.d.ts.map