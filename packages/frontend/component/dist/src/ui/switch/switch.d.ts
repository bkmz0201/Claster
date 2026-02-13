import type { HTMLAttributes, ReactNode } from 'react';
export type SwitchProps = Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: ReactNode;
    disabled?: boolean;
    /**
     * The height of the switch (including the padding)
     */
    size?: number;
    /**
     * The padding of the switch
     */
    padding?: number;
};
export declare const Switch: ({ checked: checkedProp, onChange: onChangeProp, children, className, disabled, style, size: propsSize, padding: propsPadding, ...otherProps }: SwitchProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=switch.d.ts.map