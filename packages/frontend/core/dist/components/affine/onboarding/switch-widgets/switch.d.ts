import type { HTMLAttributes } from 'react';
import type { EdgelessSwitchMode } from '../types';
interface EdgelessSwitchProps extends HTMLAttributes<HTMLDivElement> {
    mode: EdgelessSwitchMode;
    onSwitchToPageMode: () => void;
    onSwitchToEdgelessMode: () => void;
}
export declare const EdgelessSwitchButtons: ({ mode, className, onSwitchToPageMode, onSwitchToEdgelessMode, ...attrs }: EdgelessSwitchProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=switch.d.ts.map