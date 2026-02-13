import React, { type ComponentProps, type ComponentType } from 'react';
export declare function lazy<T extends ComponentType<any>>(factory: () => Promise<Record<any, T>>, fallback?: React.ReactNode): (props: ComponentProps<T>) => React.FunctionComponentElement<React.SuspenseProps>;
//# sourceMappingURL=lazy.d.ts.map