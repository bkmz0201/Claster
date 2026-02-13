import { type Server } from '@affine/core/modules/cloud';
import { type HTMLAttributes, type ReactNode } from 'react';
export interface ServerSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    selectedId: Server['id'];
    onChange: (id: Server['id']) => void;
    placeholder?: ReactNode;
}
export declare const ServerSelector: ({ selectedId, onChange, placeholder, className, ...props }: ServerSelectorProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=server-selector.d.ts.map